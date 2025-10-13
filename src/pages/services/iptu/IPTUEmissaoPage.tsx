import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { onlyDigits, formatCurrencyBRL, formatCpfCnpj, formatInscricao } from '@/utils/format';
import { openDuamResponse } from '@/utils/duam';
import { SIG_LINKS, silentRedirect } from '@/lib/sigRedirects';

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_IPTU) === 'true';

type ConsultaPayload = { cpfCnpj: string; inscricao?: string };

const IPTUEmissaoPage: React.FC = () => {
  const { toast } = useToast();
  const [cpfCnpj, setCpfCnpj] = React.useState('');
  const [inscricao, setInscricao] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState<string>('');
  const [lastQuery, setLastQuery] = React.useState<ConsultaPayload | null>(null);

  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.IPTU, { src: 'portal', feature: 'iptu-emissao' });
    }
  }, []);

  const consultar = useMutation({
    mutationFn: async ({ cpfCnpj: documento, inscricao: codigo }: ConsultaPayload) => {
      return consultarDebitos(documento, codigo);
    },
    onSuccess: (data, variables) => {
      setLastQuery(variables);
      if (!data?.length) {
        toast({
          title: 'Nenhuma guia disponível',
          description: 'Não encontramos débitos para emissão com os dados informados.',
        });
      }
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível realizar a consulta.';
      toast({ title: 'Erro ao carregar débitos', description: message });
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
        title: 'Guia emitida com sucesso',
        description: info.linhaDigitavel
          ? `Linha digitável: ${info.linhaDigitavel}`
          : `Abrimos a guia referente a ${debito.descricao} em nova aba.`,
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível emitir a guia solicitada.';
      toast({ title: 'Erro na emissão', description: message });
    },
  });

  const debitos = consultar.data ?? [];
  const anosDisponiveis = React.useMemo(
    () =>
      Array.from(new Set(debitos.map(debito => debito.ano)))
        .sort((a, b) => b - a)
        .map(ano => String(ano)),
    [debitos]
  );

  React.useEffect(() => {
    if (anosDisponiveis.length && !selectedYear) {
      setSelectedYear(anosDisponiveis[0]);
    }
  }, [anosDisponiveis, selectedYear]);

  const filtered = React.useMemo(() => {
    if (!selectedYear) return debitos;
    return debitos.filter(debito => String(debito.ano) === selectedYear);
  }, [debitos, selectedYear]);

  const emissaoEmAndamento = emitir.isPending ? emitir.variables?.debito?.id : null;

  const documentoFormatado = React.useMemo(
    () => (lastQuery?.cpfCnpj ? formatCpfCnpj(lastQuery.cpfCnpj) : ''),
    [lastQuery?.cpfCnpj]
  );

  const inscricaoFormatada = React.useMemo(
    () => (lastQuery?.inscricao ? formatInscricao(lastQuery.inscricao) : ''),
    [lastQuery?.inscricao]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const documento = onlyDigits(cpfCnpj);
    if (!documento) {
      toast({ title: 'CPF/CNPJ obrigatório', description: 'Informe o documento do contribuinte.' });
      return;
    }
    const payload: ConsultaPayload = { cpfCnpj: documento, inscricao: inscricao.trim() || undefined };
    consultar.mutate(payload);
  };

  const handleEmitir = (debito: Debito) => {
    if (!lastQuery?.cpfCnpj) {
      toast({ title: 'Consulta necessária', description: 'Busque os débitos antes de emitir as guias.' });
      return;
    }
    emitir.mutate({ debito, contexto: lastQuery });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/servicos/iptu" className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Printer className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Emissão de Guias de IPTU</h1>
            <p className="text-xl text-muted-foreground">Selecione o exercício desejado e gere a guia atualizada</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Dados para emissão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="inscricao">Inscrição imobiliária</Label>
                    <Input
                      id="inscricao"
                      value={inscricao}
                      onChange={event => setInscricao(event.target.value.toUpperCase())}
                      placeholder="Opcional"
                    />
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Informe o documento do contribuinte para listar todas as guias disponíveis.</p>
                    <p>Após a consulta, escolha o exercício desejado para gerar a guia correspondente.</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:bg-primary/90"
                  disabled={consultar.isPending}
                >
                  {consultar.isPending ? 'Buscando débitos...' : 'Consultar exercícios disponíveis'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {consultar.isError && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="py-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-700">
                  Não foi possível carregar os débitos para emissão. Tente novamente.
                </div>
              </CardContent>
            </Card>
          )}

          {consultar.data && (
            <Card>
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-semibold">Guias disponíveis</CardTitle>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="text-sm text-muted-foreground space-y-1">
                    {documentoFormatado && <p>Contribuinte: <span className="font-medium text-foreground">{documentoFormatado}</span></p>}
                    {inscricaoFormatada && <p>Inscrição: <span className="font-medium text-foreground">{inscricaoFormatada}</span></p>}
                  </div>
                  <div className="md:w-52">
                    <Label className="text-xs uppercase text-muted-foreground">Exercício</Label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {anosDisponiveis.map(ano => (
                          <SelectItem key={ano} value={ano}>
                            {ano}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filtered.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    Não há guias pendentes para o exercício selecionado.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ano</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Parcela</TableHead>
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
                            <TableCell>{debito.parcela ?? '-'}</TableCell>
                            <TableCell>{formatCurrencyBRL(debito.valorAtualizado ?? debito.valor)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleEmitir(debito)}
                                disabled={emitir.isPending && emissaoEmAndamento === debito.id}
                              >
                                {emitir.isPending && emissaoEmAndamento === debito.id ? 'Emitindo…' : 'Emitir guia'}
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

export default IPTUEmissaoPage;
