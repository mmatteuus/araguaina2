import * as React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Page from '@/components/layout/Page';
import { simulacaoRepactuacao, consultarDebitos, efetivarRepactuacao, emitirBoletos } from '@/services/arrecadacao';
import type { Debito, SimulacaoRepactuacaoItem } from '@/types/iptu';
import { SIG_LINKS, silentRedirect } from '@/lib/sigRedirects';

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_IPTU) === 'true';
const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function IPTUParcelamentoPage() {
  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.IPTU, { src: 'portal', feature: 'iptu-parcelamento' });
    }
  }, []);

  const [cpfCnpj, setCpfCnpj] = React.useState('');
  const [inscricao, setInscricao] = React.useState('');
  const [parcelas, setParcelas] = React.useState<number>(1);
  const [selecionados, setSelecionados] = React.useState<Record<string, boolean>>({});

  const { data: debitos, refetch, isFetching } = useQuery({
    queryKey: ['debitos', cpfCnpj, inscricao],
    queryFn: async () => consultarDebitos(cpfCnpj || undefined, inscricao || undefined),
    enabled: false,
  });

  const simular = useMutation({
    mutationFn: async (): Promise<SimulacaoRepactuacaoItem[]> => {
      const debitosSelecionados =
        debitos?.filter(d => selecionados[d.id])?.map(d => ({ id: d.id, ano: d.ano, tipo: 'IPTU' })) || [];
      return simulacaoRepactuacao({
        cpfCnpj: cpfCnpj || undefined,
        inscricaoImobiliaria: inscricao || undefined,
        quantidadeParcelas: parcelas,
        debitosSelecionados,
      });
    },
  });

  const efetivar = useMutation({
    mutationFn: async () => {
      const codigoSimulacao = simular.data?.[0]?.codigoSimulacao;
      if (!codigoSimulacao) throw new Error('Simulação ausente.');
      const r = await efetivarRepactuacao({
        codigoSimulacao,
        cpfCnpj: cpfCnpj || undefined,
        inscricaoImobiliaria: inscricao || undefined,
      });
      const boletos = await emitirBoletos({ protocolo: r.protocolo });
      boletos.forEach(b => window.open(b.url, '_blank', 'noopener,noreferrer'));
      return r;
    },
  });

  return (
    <Page className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Parcelamento de IPTU</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
              <Input id="cpfCnpj" inputMode="numeric" value={cpfCnpj}
                onChange={e => setCpfCnpj(e.target.value.replace(/\D/g, ''))} placeholder="Somente números" />
            </div>
            <div>
              <Label htmlFor="inscricao">Inscrição Imobiliária</Label>
              <Input id="inscricao" value={inscricao}
                onChange={e => setInscricao(e.target.value)} placeholder="Ex.: 123456-0" />
            </div>
            <div>
              <Label>Nº de parcelas</Label>
              <Select value={String(parcelas)} onValueChange={v => setParcelas(Number(v))}>
                <SelectTrigger><SelectValue placeholder="Escolha" /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => refetch()} disabled={isFetching}>Consultar débitos</Button>
            <Button onClick={() => simular.mutate()} variant="secondary" disabled={!debitos?.length || (simular as any).isPending}>Simular</Button>
            <Button onClick={() => efetivar.mutate()} variant="default" disabled={!simular.data?.length || (efetivar as any).isPending}>Confirmar e gerar boletos</Button>
          </div>

          {debitos && (
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
                  {debitos.map((d: Debito) => (
                    <tr key={d.id} className="border-b">
                      <td className="py-2">
                        <input type="checkbox" checked={!!selecionados[d.id]}
                          onChange={e => setSelecionados(s => ({ ...s, [d.id]: e.target.checked }))} disabled={!d.selecionavel} />
                      </td>
                      <td>{d.ano}</td>
                      <td>{d.descricao}</td>
                      <td>{brl(d.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {simular.data && (
            <div className="overflow-x-auto">
              <h3 className="font-medium mt-4 mb-2">Simulação</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Parcela</th>
                    <th>Original</th>
                    <th>Juros</th>
                    <th>Multa</th>
                    <th>Correção</th>
                    <th>Saldo Devedor</th>
                    <th>Vencimento</th>
                  </tr>
                </thead>
                <tbody>
                  {simular.data.map(p => (
                    <tr key={p.parcela} className="border-b">
                      <td className="py-2">{p.parcela}</td>
                      <td>{brl(p.valorOriginal)}</td>
                      <td>{brl(p.valorJuros)}</td>
                      <td>{brl(p.valorMulta)}</td>
                      <td>{brl(p.valorCorrecao)}</td>
                      <td>{brl(p.valorSaldoDevedor)}</td>
                      <td>{new Date(p.vencimento).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(simular as any).isError || (efetivar as any).isError ? (
            <p className="text-red-600 text-sm">
              {((simular as any).error as Error)?.message || ((efetivar as any).error as Error)?.message}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </Page>
  );
}

