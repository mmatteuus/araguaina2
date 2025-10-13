import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Building, ArrowLeft, AlertCircle, Download, CheckCircle2 } from 'lucide-react';
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

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_ALVARA) === 'true';

type ConsultaPayload = { cnpj?: string; inscricao?: string };

const isBusinessLicenseDebt = (debito: Debito) => {
  const descricao = (debito.descricao || '').toLowerCase();
  const tipo = (debito.tipo || '').toLowerCase();
  return descricao.includes('alvar') || descricao.includes('licença') || descricao.includes('funcionamento') || tipo.includes('alvar');
};

const AlvaraPage: React.FC = () => {
  const { toast } = useToast();
  const [cnpj, setCnpj] = React.useState('');
  const [inscricao, setInscricao] = React.useState('');
  const [lastQuery, setLastQuery] = React.useState<ConsultaPayload | null>(null);

  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.ALVARA, { src: 'portal', feature: 'alvara' });
    }
  }, []);

  const consultar = useMutation({
    mutationFn: async ({ cnpj: documento, inscricao: codigo }: ConsultaPayload) => {
      return consultarDebitos(documento, codigo);
    },
    onSuccess: (data, variables) => {
      setLastQuery(variables);
      if (!data?.length) {
        toast({
          title: 'Nenhum débito encontrado',
          description: 'A empresa não possui pendências de alvará de funcionamento.',
        });
      }
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível consultar os débitos.';
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
        cpfCnpj: contexto.cnpj,
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
        title: 'Guia de alvará emitida',
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
  const filtered = React.useMemo(() => debitos.filter(isBusinessLicenseDebt), [debitos]);
  const total = React.useMemo(
    () => sumValues(filtered.map(debito => debito.valorAtualizado ?? debito.valor)),
    [filtered]
  );

  const emissaoEmAndamento = emitir.isPending ? emitir.variables?.debito?.id : null;

  const documentoFormatado = lastQuery?.cnpj ? formatCpfCnpj(lastQuery.cnpj) : '';
  const inscricaoFormatada = lastQuery?.inscricao ? formatInscricao(lastQuery.inscricao) : '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const documento = cnpj ? onlyDigits(cnpj) : '';
    const codigo = inscricao.trim();
    if (!documento && !codigo) {
      toast({
        title: 'Informe CNPJ ou inscrição',
        description: 'Forneça ao menos um identificador para localizar os débitos do estabelecimento.',
      });
      return;
    }
    const payload: ConsultaPayload = {
      cnpj: documento || undefined,
      inscricao: codigo || undefined,
    };
    consultar.mutate(payload);
  };

  const handleEmitir = (debito: Debito) => {
    if (!lastQuery?.cnpj && !lastQuery?.inscricao) {
      toast({ title: 'Consulta necessária', description: 'Realize a consulta antes de emitir a guia.' });
      return;
    }
    emitir.mutate({ debito, contexto: lastQuery });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Link to="/servicos" className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Building className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Alvará de Funcionamento</h1>
            <p className="text-lg text-muted-foreground">
              Emita as guias para regularizar ou renovar o alvará do seu estabelecimento.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Consultar débitos do alvará
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ da empresa</Label>
                    <Input
                      id="cnpj"
                      value={cnpj}
                      onChange={event => setCnpj(onlyDigits(event.target.value))}
                      placeholder="Somente números"
                      inputMode="numeric"
                      maxLength={14}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inscricao">Inscrição municipal</Label>
                    <Input
                      id="inscricao"
                      value={inscricao}
                      onChange={event => setInscricao(event.target.value.toUpperCase())}
                      placeholder="Opcional, quando disponível"
                    />
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Informe o CNPJ da empresa ou a inscrição municipal para localizar débitos do alvará.</p>
                    <p>Após o pagamento, mantenha a guia arquivada para comprovação junto à fiscalização municipal.</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-primary hover:bg-primary/90"
                  disabled={consultar.isPending}
                >
                  {consultar.isPending ? 'Consultando...' : 'Consultar débitos'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Informações sobre o serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p>• Solicite o alvará para novas atividades comerciais e industriais.</p>
                <p>• Renove o documento anualmente para manter o estabelecimento em situação regular.</p>
              </div>
              <div className="space-y-2">
                <p>• Consulte o andamento de solicitações em aberto pelo protocolo.</p>
                <p>• Atualize dados cadastrais do estabelecimento quando houver alterações.</p>
              </div>
            </CardContent>
          </Card>

          {consultar.data && (
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-semibold">Débitos do alvará</CardTitle>
                <div className="text-sm text-muted-foreground space-y-1">
                  {documentoFormatado && <p>CNPJ: <span className="font-medium text-foreground">{documentoFormatado}</span></p>}
                  {inscricaoFormatada && <p>Inscrição municipal: <span className="font-medium text-foreground">{inscricaoFormatada}</span></p>}
                  <p>Total em aberto: <span className="font-semibold text-foreground">{formatCurrencyBRL(total)}</span></p>
                </div>
              </CardHeader>
              <CardContent>
                {filtered.length === 0 ? (
                  <div className="text-sm text-muted-foreground">Nenhum débito de alvará foi encontrado para os dados informados.</div>
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

export default AlvaraPage;
