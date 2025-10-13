import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { consultarDebitos, emitirDuam } from '@/services/arrecadacao';
import type { Debito, DuamResponse } from '@/types/iptu';
import { onlyDigits, formatCurrencyBRL, formatCpfCnpj, formatInscricao, sumValues } from '@/utils/format';
import { openDuamResponse } from '@/utils/duam';
import { SIG_LINKS, silentRedirect } from '@/lib/sigRedirects';

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_TAXAS) === 'true';

type ConsultaPayload = { inscricao: string; cpfCnpj?: string };

const isGarbageDebt = (debito: Debito) => {
  const descricao = (debito.descricao || '').toLowerCase();
  const tipo = (debito.tipo || '').toLowerCase();
  return descricao.includes('lixo') || descricao.includes('coleta') || descricao.includes('resíduos') || tipo.includes('lixo');
};

const TaxaLixoPage: React.FC = () => {
  const { toast } = useToast();
  const [inscricao, setInscricao] = React.useState('');
  const [cpfCnpj, setCpfCnpj] = React.useState('');
  const [lastQuery, setLastQuery] = React.useState<ConsultaPayload | null>(null);

  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.TAXAS, { src: 'portal', feature: 'taxa-lixo' });
    }
  }, []);

  const consultar = useMutation({
    mutationFn: async ({ inscricao: codigo, cpfCnpj: documento }: ConsultaPayload) => {
      return consultarDebitos(documento, codigo);
    },
    onSuccess: (data, variables) => {
      setLastQuery(variables);
      if (!data?.length) {
        toast({
          title: 'Nenhum débito encontrado',
          description: 'A inscrição informada está sem pendências de taxa de lixo.',
        });
      }
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível consultar a taxa de lixo.';
      toast({ title: 'Erro ao consultar', description: message });
    },
  });

  const emitir = useMutation<
    { resposta: DuamResponse | Blob; debito: Debito },
    unknown,
    { debito: Debito; contexto: ConsultaPayload }
  >({
    mutationFn: async ({ debito, contexto }) => {
      const resposta = await emitirDuam({
        debitoId: debito.id,
        cpfCnpj: contexto.cpfCnpj,
        inscricao: debito.inscricao ?? contexto.inscricao,
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
          : `Abrimos a guia de ${debito.descricao} em nova aba.`,
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível emitir a guia.';
      toast({ title: 'Erro na emissão', description: message });
    },
  });

  const debitos = consultar.data ?? [];
  const filtered = React.useMemo(() => debitos.filter(isGarbageDebt), [debitos]);
  const total = React.useMemo(
    () => sumValues(filtered.map(debito => debito.valorAtualizado ?? debito.valor)),
    [filtered]
  );

  const emissaoEmAndamento = emitir.isPending ? emitir.variables?.debito?.id : null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const codigo = inscricao.trim();
    if (!codigo) {
      toast({ title: 'Inscrição obrigatória', description: 'Informe a inscrição imobiliária do imóvel.' });
      return;
    }
    const payload: ConsultaPayload = {
      inscricao: codigo,
      cpfCnpj: cpfCnpj ? onlyDigits(cpfCnpj) : undefined,
    };
    consultar.mutate(payload);
  };

  const handleEmitir = (debito: Debito) => {
    if (!lastQuery?.inscricao) {
      toast({ title: 'Consulta necessária', description: 'Busque a inscrição antes de emitir a guia.' });
      return;
    }
    emitir.mutate({ debito, contexto: lastQuery });
  };

  const documentoFormatado = lastQuery?.cpfCnpj ? formatCpfCnpj(lastQuery.cpfCnpj) : '';
  const inscricaoFormatada = lastQuery?.inscricao ? formatInscricao(lastQuery.inscricao) : '';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link to="/servicos/iptu" className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Trash2 className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Taxa de Coleta de Lixo</h1>
            <p className="text-lg text-muted-foreground">
              Consulte débitos de coleta de lixo e gere a guia atualizada diretamente pelo portal.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Emitir guia da taxa de lixo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="inscricao">Inscrição imobiliária *</Label>
                  <Input
                    id="inscricao"
                    value={inscricao}
                    onChange={event => setInscricao(event.target.value.toUpperCase())}
                    placeholder="Informe a inscrição do imóvel"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpfCnpj">CPF/CNPJ do contribuinte (opcional)</Label>
                  <Input
                    id="cpfCnpj"
                    value={cpfCnpj}
                    onChange={event => setCpfCnpj(onlyDigits(event.target.value))}
                    placeholder="Somente números"
                    inputMode="numeric"
                    maxLength={14}
                  />
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>A taxa de coleta de lixo é vinculada à inscrição imobiliária e cobrada anualmente.</p>
                    <p>Mantenha o pagamento em dia para evitar juros e não comprometer serviços públicos.</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:bg-primary/90"
                  disabled={consultar.isPending}
                >
                  {consultar.isPending ? 'Consultando...' : 'Consultar e emitir guia'}
                </Button>
              </form>
            </CardContent>
          </Card>

  {consultar.data && (
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Débitos da taxa de lixo</CardTitle>
                <div className="text-sm text-muted-foreground space-y-1">
                  {inscricaoFormatada && <p>Inscrição: <span className="font-medium text-foreground">{inscricaoFormatada}</span></p>}
                  {documentoFormatado && <p>Contribuinte: <span className="font-medium text-foreground">{documentoFormatado}</span></p>}
                  <p>Total em aberto: <span className="font-semibold text-foreground">{formatCurrencyBRL(total)}</span></p>
                </div>
              </CardHeader>
              <CardContent>
                {filtered.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    Nenhum débito de coleta de lixo foi encontrado para a inscrição informada.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ano</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead className="w-32 text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map(debito => (
                          <TableRow key={debito.id}>
                            <TableCell className="font-semibold">{debito.ano}</TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <span className="font-medium text-foreground">{debito.descricao}</span>
                                {debito.tipo && <Badge variant="outline" className="w-fit">{debito.tipo}</Badge>}
                              </div>
                            </TableCell>
                            <TableCell>{formatCurrencyBRL(debito.valorAtualizado ?? debito.valor)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleEmitir(debito)}
                                disabled={emitir.isPending && emissaoEmAndamento === debito.id}
                              >
                                {emitir.isPending && emissaoEmAndamento === debito.id ? 'Gerando…' : 'Emitir guia'}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TaxaLixoPage;
