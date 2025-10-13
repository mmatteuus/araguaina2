import * as React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  simulacaoRepactuacao,
  consultarDebitos,
  efetivarRepactuacao,
  emitirBoletos,
  type EfetivarRepactuacaoResult,
} from '@/services/arrecadacao';
import type { Debito, SimulacaoRepactuacaoItem } from '@/types/iptu';
import { SIG_LINKS, silentRedirect } from '@/lib/sigRedirects';
import { formatCurrencyBRL, onlyDigits, sumValues } from '@/utils/format';
import { useToast } from '@/hooks/use-toast';

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_IPTU) === 'true';

export default function IPTUParcelamentoPage() {
  const { toast } = useToast();

  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.IPTU, { src: 'portal', feature: 'iptu-parcelamento' });
    }
  }, []);

  const [cpfCnpj, setCpfCnpj] = React.useState('');
  const [inscricao, setInscricao] = React.useState('');
  const [parcelas, setParcelas] = React.useState<number>(6);
  const [selecionados, setSelecionados] = React.useState<Record<string, boolean>>({});
  const [ultimoParcelamento, setUltimoParcelamento] = React.useState<EfetivarRepactuacaoResult | null>(null);

  const consultar = useQuery({
    queryKey: ['debitos-parcelamento', cpfCnpj, inscricao],
    queryFn: async () => consultarDebitos(cpfCnpj || undefined, inscricao || undefined),
    enabled: false,
  });

  const debitos = consultar.data ?? [];
  const selecionadosLista = React.useMemo(
    () => debitos.filter(debito => selecionados[debito.id]),
    [debitos, selecionados]
  );
  const totalSelecionado = React.useMemo(
    () => sumValues(selecionadosLista.map(debito => debito.valorAtualizado ?? debito.valor)),
    [selecionadosLista]
  );

  const simular = useMutation<SimulacaoRepactuacaoItem[], Error, void>({
    mutationFn: async () => {
      if (!selecionadosLista.length) {
        throw new Error('Selecione ao menos um débito para simular o parcelamento.');
      }
      return simulacaoRepactuacao({
        cpfCnpj: cpfCnpj || undefined,
        inscricaoImobiliaria: inscricao || undefined,
        quantidadeParcelas: parcelas,
        debitosSelecionados: selecionadosLista.map(debito => ({
          id: debito.id,
          ano: debito.ano,
          tipo: debito.tipo,
          parcela: debito.parcela,
        })),
      });
    },
    onSuccess: () => {
      toast({ title: 'Simulação realizada', description: 'Revise as parcelas e confirme para gerar os boletos.' });
    },
    onError: error => {
      toast({ title: 'Erro na simulação', description: error.message });
    },
  });

  const efetivar = useMutation<EfetivarRepactuacaoResult, Error, void>({
    mutationFn: async () => {
      const codigoSimulacao = simular.data?.[0]?.codigoSimulacao;
      if (!codigoSimulacao) throw new Error('Realize a simulação antes de confirmar o parcelamento.');
      const resultado = await efetivarRepactuacao({
        codigoSimulacao,
        cpfCnpj: cpfCnpj || undefined,
        inscricaoImobiliaria: inscricao || undefined,
      });
      const boletos = await emitirBoletos({ protocolo: resultado.protocolo });
      boletos.forEach(boleto => window.open(boleto.url, '_blank', 'noopener,noreferrer'));
      return resultado;
    },
    onSuccess: resultado => {
      setUltimoParcelamento(resultado);
      toast({
        title: 'Parcelamento concluído',
        description: `Protocolo ${resultado.protocolo} gerado com ${resultado.parcelasGeradas} boletos.`,
      });
    },
    onError: error => {
      toast({ title: 'Erro ao confirmar', description: error.message });
    },
  });

  const handleConsultar = () => {
    if (!cpfCnpj && !inscricao) {
      toast({ title: 'Informe os dados', description: 'Digite o CPF/CNPJ ou a inscrição do imóvel para consultar.' });
      return;
    }
    setSelecionados({});
    setUltimoParcelamento(null);
    simular.reset();
    efetivar.reset();
    consultar.refetch();
  };

  const handleSelecionar = (debito: Debito, marcado: boolean) => {
    setSelecionados(prev => ({ ...prev, [debito.id]: marcado }));
  };

  const simulacao = simular.data ?? [];

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Parcelamento de débitos municipais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
              <Input
                id="cpfCnpj"
                inputMode="numeric"
                value={cpfCnpj}
                onChange={event => setCpfCnpj(onlyDigits(event.target.value))}
                placeholder="Somente números"
              />
            </div>
            <div>
              <Label htmlFor="inscricao">Inscrição imobiliária (opcional)</Label>
              <Input
                id="inscricao"
                value={inscricao}
                onChange={event => setInscricao(event.target.value.toUpperCase())}
                placeholder="Ex.: 123456-0"
              />
            </div>
            <div>
              <Label htmlFor="parcelas">Nº de parcelas</Label>
              <Select value={String(parcelas)} onValueChange={value => setParcelas(Number(value))}>
                <SelectTrigger id="parcelas">
                  <SelectValue placeholder="Escolha" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, index) => (
                    <SelectItem key={index + 1} value={String(index + 1)}>
                      {index + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleConsultar} disabled={consultar.isFetching}>
              {consultar.isFetching ? 'Consultando...' : 'Consultar débitos'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => simular.mutate()}
              disabled={!debitos.length || simular.isPending}
            >
              {simular.isPending ? 'Simulando...' : 'Simular parcelamento'}
            </Button>
            <Button
              onClick={() => efetivar.mutate()}
              disabled={!simulacao.length || efetivar.isPending}
            >
              {efetivar.isPending ? 'Gerando boletos...' : 'Confirmar e gerar boletos'}
            </Button>
          </div>

          {debitos.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Selecione os débitos que deseja incluir na negociação.</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Selecionar</th>
                      <th>Ano</th>
                      <th>Descrição</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debitos.map(debito => (
                      <tr key={debito.id} className="border-b">
                        <td className="py-2">
                          <input
                            type="checkbox"
                            checked={!!selecionados[debito.id]}
                            onChange={event => handleSelecionar(debito, event.target.checked)}
                            disabled={!debito.selecionavel}
                          />
                        </td>
                        <td>{debito.ano}</td>
                        <td className="flex flex-col gap-1 py-2">
                          <span className="font-medium">{debito.descricao}</span>
                          {debito.tipo && <Badge variant="outline" className="w-fit">{debito.tipo}</Badge>}
                        </td>
                        <td>{formatCurrencyBRL(debito.valorAtualizado ?? debito.valor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-sm text-muted-foreground">
                Selecionados: <span className="font-semibold text-foreground">{selecionadosLista.length}</span> — Total:{' '}
                <span className="font-semibold text-foreground">{formatCurrencyBRL(totalSelecionado)}</span>
              </div>
            </div>
          )}

          {simulacao.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Simulação das parcelas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2">Parcela</th>
                      <th>Valor original</th>
                      <th>Juros</th>
                      <th>Multa</th>
                      <th>Correção</th>
                      <th>Desconto</th>
                      <th>Saldo devedor</th>
                      <th>Vencimento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulacao.map(parcela => (
                      <tr key={parcela.parcela} className="border-b">
                        <td className="py-2">{parcela.parcela}</td>
                        <td>{formatCurrencyBRL(parcela.valorOriginal)}</td>
                        <td>{formatCurrencyBRL(parcela.valorJuros)}</td>
                        <td>{formatCurrencyBRL(parcela.valorMulta)}</td>
                        <td>{formatCurrencyBRL(parcela.valorCorrecao)}</td>
                        <td>{formatCurrencyBRL(parcela.valorDesconto)}</td>
                        <td>{formatCurrencyBRL(parcela.valorSaldoDevedor)}</td>
                        <td>{new Date(parcela.vencimento).toLocaleDateString('pt-BR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(consultar.isError || simular.isError || efetivar.isError) && (
            <div className="text-sm text-red-600">
              {(consultar.error as Error)?.message ||
                (simular.error as Error)?.message ||
                (efetivar.error as Error)?.message}
            </div>
          )}
        </CardContent>
      </Card>

      {ultimoParcelamento && (
        <Card className="border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle2 className="w-5 h-5" />
              Parcelamento confirmado
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-700 space-y-1">
            <p>
              Protocolo: <span className="font-semibold">{ultimoParcelamento.protocolo}</span>
            </p>
            <p>
              Parcelas geradas: <span className="font-semibold">{ultimoParcelamento.parcelasGeradas}</span>
            </p>
            <p>Os boletos foram abertos em novas abas. Salve-os para garantir o pagamento dentro dos prazos.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
