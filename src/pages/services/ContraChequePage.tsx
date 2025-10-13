import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import { AlertCircle, FileText, Download, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  consultarContraCheque,
  emitirContraChequePdf,
  type ContraChequeDetalhe,
  type ContraChequeFiltro,
} from '@/services/folha';
import { formatCurrencyBRL } from '@/utils/format';

const meses = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

const anosDisponiveis = Array.from({ length: 5 }).map((_, index) => new Date().getFullYear() - index);

const abrirDocumento = (resposta: Blob | { url?: string; pdfBase64?: string }) => {
  const target = '_blank';
  if (resposta instanceof Blob) {
    const url = URL.createObjectURL(resposta);
    window.open(url, target, 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return;
  }
  if (resposta?.url) {
    window.open(resposta.url, target, 'noopener,noreferrer');
    return;
  }
  if (resposta?.pdfBase64) {
    const cleaned = resposta.pdfBase64.includes(',') ? resposta.pdfBase64.split(',')[1] : resposta.pdfBase64;
    const binary = typeof window !== 'undefined' && typeof window.atob === 'function'
      ? window.atob(cleaned)
      : Buffer.from(cleaned, 'base64').toString('binary');
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) buffer[i] = binary.charCodeAt(i);
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, target, 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
};

const ContraChequePage: React.FC = () => {
  const { toast } = useToast();
  const hoje = new Date();
  const [matricula, setMatricula] = React.useState('');
  const [mes, setMes] = React.useState<number>(hoje.getMonth() === 0 ? 12 : hoje.getMonth());
  const [ano, setAno] = React.useState<number>(hoje.getMonth() === 0 ? hoje.getFullYear() - 1 : hoje.getFullYear());

  const consultar = useMutation<ContraChequeDetalhe, Error, ContraChequeFiltro>({
    mutationFn: filtro => consultarContraCheque(filtro),
    onError: error => {
      toast({ title: 'Não foi possível consultar', description: error.message });
    },
  });

  const emitir = useMutation<Blob | { url?: string; pdfBase64?: string }, Error, ContraChequeFiltro>({
    mutationFn: filtro => emitirContraChequePdf(filtro),
    onSuccess: resposta => {
      abrirDocumento(resposta);
      toast({ title: 'Contra-cheque gerado', description: 'O documento foi aberto em uma nova aba.' });
    },
    onError: error => {
      toast({ title: 'Erro ao gerar PDF', description: error.message });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!matricula.trim()) {
      toast({ title: 'Informe a matrícula', description: 'Digite a matrícula funcional para consultar o contra-cheque.' });
      return;
    }
    consultar.mutate({ matricula: matricula.trim(), mes, ano });
  };

  const dados = consultar.data;
  const totalProventos = dados?.totalProventos ?? sumValues(dados?.proventos.map(item => item.valor) ?? []);
  const totalDescontos = dados?.totalDescontos ?? sumValues(dados?.descontos.map(item => item.valor) ?? []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Emissão de contra-cheque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="matricula">Matrícula do servidor *</Label>
                  <Input
                    id="matricula"
                    value={matricula}
                    onChange={event => setMatricula(event.target.value.trim())}
                    placeholder="Informe sua matrícula"
                    required
                  />
                </div>
                <div>
                  <Label>Competência</Label>
                  <div className="flex gap-2">
                    <Select value={String(mes)} onValueChange={value => setMes(Number(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        {meses.map(item => (
                          <SelectItem key={item.value} value={String(item.value)}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={String(ano)} onValueChange={value => setAno(Number(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent>
                        {anosDisponiveis.map(item => (
                          <SelectItem key={item} value={String(item)}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full" disabled={consultar.isPending}>
                    {consultar.isPending ? 'Consultando...' : 'Consultar contra-cheque'}
                  </Button>
                </div>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3 text-sm text-muted-foreground">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  Para acesso, utilize as mesmas credenciais do Portal do Servidor. O documento emitido possui assinatura digital
                  e código de verificação.
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {dados && (
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <CardTitle className="text-lg font-semibold">{dados.nome}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Matrícula {dados.matricula} — {meses.find(item => item.value === dados.mes)?.label ?? dados.mes}/{dados.ano}
                </p>
                {dados.lotacao && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Lotação: <span className="font-medium text-foreground">{dados.lotacao}</span>
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  Líquido: {formatCurrencyBRL(dados.liquido)}
                </Badge>
                <Button
                  variant="secondary"
                  onClick={() => emitir.mutate({ matricula: dados.matricula, mes: dados.mes, ano: dados.ano })}
                  disabled={emitir.isPending}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {emitir.isPending ? 'Gerando...' : 'Baixar PDF'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Proventos
                  </h3>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <tbody>
                        {dados.proventos.map(item => (
                          <tr key={`${item.descricao}-${item.valor}`} className="border-b last:border-0">
                            <td className="px-3 py-2">{item.descricao}</td>
                            <td className="px-3 py-2 text-right">{formatCurrencyBRL(item.valor)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total de proventos: <span className="font-semibold text-foreground">{formatCurrencyBRL(totalProventos)}</span>
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Descontos
                  </h3>
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <tbody>
                        {dados.descontos.map(item => (
                          <tr key={`${item.descricao}-${item.valor}`} className="border-b last:border-0">
                            <td className="px-3 py-2">{item.descricao}</td>
                            <td className="px-3 py-2 text-right">{formatCurrencyBRL(item.valor)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total de descontos: <span className="font-semibold text-foreground">{formatCurrencyBRL(totalDescontos)}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default ContraChequePage;

