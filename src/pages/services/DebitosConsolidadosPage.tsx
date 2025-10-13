import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, FileText, Download } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { consultarDebitos, emitirDuam } from '@/services/arrecadacao';
import type { Debito, DuamResponse } from '@/types/iptu';
import { formatCurrencyBRL, onlyDigits, sumValues } from '@/utils/format';
import { openDuamResponse } from '@/utils/duam';
import { useToast } from '@/hooks/use-toast';
import { SIG_LINKS, silentRedirect } from '@/lib/sigRedirects';

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_IPTU) === 'true';

const isNotEmpty = (value: string | null | undefined) => (value || '').trim().length > 0;

const DebitosConsolidadosPage: React.FC = () => {
  const { toast } = useToast();
  const [cpfCnpj, setCpfCnpj] = React.useState('');
  const [filtroTipo, setFiltroTipo] = React.useState<string>('todos');

  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.TAXAS, { src: 'portal', feature: 'debitos-consolidados' });
    }
  }, []);

  const consultar = useMutation({
    mutationFn: async (documento: string) => consultarDebitos(documento),
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível consultar os débitos.';
      toast({ title: 'Erro na consulta', description: message });
    },
  });

  const emitir = useMutation<
    { resposta: DuamResponse | Blob; debito: Debito },
    unknown,
    { debito: Debito; documento: string }
  >({
    mutationFn: async ({ debito, documento }) => {
      const resposta = await emitirDuam({
        debitoId: debito.id,
        cpfCnpj: documento,
        inscricao: debito.inscricao,
        ano: debito.ano,
        parcela: debito.parcela,
        tipo: debito.tipo,
      });
      return { resposta, debito };
    },
    onSuccess: ({ resposta, debito }) => {
      const info = openDuamResponse(resposta);
      toast({
        title: 'Guia emitida',
        description: info.linhaDigitavel
          ? `Linha digitável: ${info.linhaDigitavel}`
          : `A guia referente a ${debito.descricao} foi aberta em uma nova aba.`,
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível emitir a guia.';
      toast({ title: 'Erro na emissão', description: message });
    },
  });

  const debitos = consultar.data ?? [];
  const tiposDisponiveis = React.useMemo(
    () =>
      Array.from(
        new Set(
          debitos
            .map(debito => debito.tipo)
            .filter(isNotEmpty)
            .map(tipo => tipo as string)
        )
      ).sort(),
    [debitos]
  );

  const filtrados = React.useMemo(() => {
    if (filtroTipo === 'todos') return debitos;
    return debitos.filter(debito => (debito.tipo || '').toLowerCase() === filtroTipo.toLowerCase());
  }, [debitos, filtroTipo]);

  const total = React.useMemo(
    () => sumValues(filtrados.map(debito => debito.valorAtualizado ?? debito.valor)),
    [filtrados]
  );

  const handleConsultar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cpfCnpj) {
      toast({ title: 'Informe o CPF/CNPJ', description: 'Digite o documento para buscar débitos.' });
      return;
    }
    consultar.mutate(onlyDigits(cpfCnpj));
  };

  const handleEmitir = (debito: Debito) => {
    if (!consultar.variables) {
      toast({ title: 'Consulta necessária', description: 'Busque os débitos antes de emitir a guia.' });
      return;
    }
    emitir.mutate({ debito, documento: consultar.variables });
  };

  const handleExportar = () => {
    if (!filtrados.length) {
      toast({ title: 'Nada para exportar', description: 'Realize uma consulta antes de exportar.' });
      return;
    }
    const header = ['Tipo', 'Descrição', 'Ano', 'Parcela', 'Valor'];
    const rows = filtrados.map(debito => [
      debito.tipo ?? '',
      (debito.descricao || '').replace(/;/g, ','),
      String(debito.ano ?? ''),
      debito.parcela != null ? String(debito.parcela) : '',
      String(debito.valorAtualizado ?? debito.valor ?? 0).replace('.', ','),
    ]);
    const csv = [header, ...rows].map(row => row.join(';')).join('\r\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `debitos-${cpfCnpj || 'contribuinte'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Consulta consolidada de débitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConsultar} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                <Input
                  id="cpfCnpj"
                  value={cpfCnpj}
                  onChange={event => setCpfCnpj(onlyDigits(event.target.value))}
                  placeholder="Somente números"
                  inputMode="numeric"
                  maxLength={14}
                  required
                />
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3 text-sm text-muted-foreground">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  Consulte todas as pendências registradas para o contribuinte informado e gere as guias individualmente.
                </div>
              </div>
              <Button type="submit" disabled={consultar.isPending}>
                {consultar.isPending ? 'Consultando...' : 'Consultar débitos'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {debitos.length > 0 && (
          <Card>
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Débitos encontrados</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total: <span className="font-semibold text-foreground">{formatCurrencyBRL(total)}</span> — {filtrados.length}{' '}
                  registros
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filtrar por tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    {tiposDisponiveis.map(tipo => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="secondary" onClick={handleExportar}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Tipo</th>
                      <th>Descrição</th>
                      <th>Ano</th>
                      <th>Parcela</th>
                      <th>Valor</th>
                      <th className="w-32 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrados.map(debito => (
                      <tr key={debito.id} className="border-b">
                        <td className="py-2">{debito.tipo ? <Badge variant="outline">{debito.tipo}</Badge> : '-'}</td>
                        <td className="py-2">{debito.descricao}</td>
                        <td>{debito.ano ?? '-'}</td>
                        <td>{debito.parcela != null ? debito.parcela : '-'}</td>
                        <td>{formatCurrencyBRL(debito.valorAtualizado ?? debito.valor)}</td>
                        <td className="text-right">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleEmitir(debito)}
                            disabled={emitir.isPending && emitir.variables?.debito.id === debito.id}
                          >
                            {emitir.isPending && emitir.variables?.debito.id === debito.id ? 'Gerando...' : 'Emitir guia'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default DebitosConsolidadosPage;
