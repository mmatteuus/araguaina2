import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, FileText, AlertCircle, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { consultarDebitos, emitirDuam } from '@/services/arrecadacao';
import type { Debito, DuamResponse } from '@/types/iptu';
import { onlyDigits, formatCurrencyBRL, formatCpfCnpj, formatInscricao, sumValues } from '@/utils/format';
import { openDuamResponse } from '@/utils/duam';
import { SIG_LINKS, silentRedirect } from '@/lib/sigRedirects';

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_IPTU) === 'true';

type ConsultaPayload = { cpfCnpj: string; inscricao?: string };

const IPTUConsultaPage: React.FC = () => {
  const { toast } = useToast();
  const [cpfCnpj, setCpfCnpj] = React.useState('');
  const [inscricao, setInscricao] = React.useState('');
  const [lastQuery, setLastQuery] = React.useState<ConsultaPayload | null>(null);

  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.IPTU, { src: 'portal', feature: 'iptu-consulta' });
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
          title: 'Nenhum débito encontrado',
          description: 'O contribuinte consultado não possui pendências de IPTU.',
        });
      }
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível concluir a consulta.';
      toast({ title: 'Erro ao consultar IPTU', description: message });
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
        title: 'Guia gerada com sucesso',
        description: info.linhaDigitavel
          ? `Linha digitável: ${info.linhaDigitavel}`
          : `A guia ${debito.descricao} foi aberta em uma nova aba.`,
      });
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível emitir a guia.';
      toast({ title: 'Erro ao emitir DUAM', description: message });
    },
  });

  const debitos = consultar.data ?? [];
  const totalAtualizado = React.useMemo(
    () => sumValues(debitos.map(debito => debito.valorAtualizado ?? debito.valor)),
    [debitos]
  );

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
      toast({ title: 'Consulta necessária', description: 'Realize a consulta antes de emitir a guia.' });
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
              <Search className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Consulta de IPTU</h1>
            <p className="text-xl text-muted-foreground">Visualize débitos vinculados ao imóvel e gere as guias na hora</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Dados para consulta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cpfCnpj">CPF/CNPJ do contribuinte *</Label>
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
                    <Label htmlFor="inscricao">Inscrição imobiliária (opcional)</Label>
                    <Input
                      id="inscricao"
                      value={inscricao}
                      onChange={event => setInscricao(event.target.value.toUpperCase())}
                      placeholder="Ex.: 123456-0"
                    />
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Informe o CPF/CNPJ do proprietário e, se desejar, a inscrição do imóvel.</p>
                    <p>Os valores exibidos já consideram juros e correções até a data atual.</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:bg-primary/90"
                  disabled={consultar.isPending}
                >
                  {consultar.isPending ? 'Consultando...' : <><Search className="w-4 h-4 mr-2" />Consultar débitos</>}
                </Button>
              </form>
            </CardContent>
          </Card>

          {consultar.isError && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="py-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-700">
                  Não foi possível carregar os débitos. Tente novamente em instantes.
                </div>
              </CardContent>
            </Card>
          )}

          {consultar.data && (
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Resultados da consulta
                </CardTitle>
                <div className="text-sm text-muted-foreground space-y-1">
                  {documentoFormatado && <p>Contribuinte: <span className="font-medium text-foreground">{documentoFormatado}</span></p>}
                  {inscricaoFormatada && <p>Inscrição imobiliária: <span className="font-medium text-foreground">{inscricaoFormatada}</span></p>}
                  <p>Total em aberto: <span className="font-semibold text-foreground">{formatCurrencyBRL(totalAtualizado)}</span></p>
                </div>
              </CardHeader>
              <CardContent>
                {debitos.length === 0 ? (
                  <div className="text-sm text-muted-foreground">Nenhum débito pendente para os dados informados.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ano</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Parcela</TableHead>
                          <TableHead>Valor atualizado</TableHead>
                          <TableHead className="hidden md:table-cell">Situação</TableHead>
                          <TableHead className="w-32 text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {debitos.map(debito => (
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
                            <TableCell className="hidden md:table-cell">{debito.situacao ?? 'Em aberto'}</TableCell>
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

export default IPTUConsultaPage;
