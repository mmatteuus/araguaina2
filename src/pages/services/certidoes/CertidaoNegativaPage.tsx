import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileCheck, FileText, AlertCircle, Download, ClipboardCopy } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { emitirCertidaoNegativa } from '@/services/certidoes';
import type { CertidaoResponse, CertidaoNegativaTipo } from '@/services/certidoes';
import { onlyDigits, formatCpfCnpj } from '@/utils/format';
import { SIG_LINKS, silentRedirect } from '@/lib/sigRedirects';

const enableBackend = String(import.meta.env.VITE_ENABLE_BACKEND_CERTIDOES) === 'true';

const tiposCertidao: Array<{ value: CertidaoNegativaTipo; label: string }> = [
  { value: 'geral', label: 'Certidão Geral de Débitos' },
  { value: 'iptu', label: 'Certidão Negativa de IPTU' },
  { value: 'iss', label: 'Certidão Negativa de ISS' },
  { value: 'taxas', label: 'Certidão Negativa de Taxas' },
  { value: 'multas', label: 'Certidão Negativa de Multas' },
];

const abrirCertidao = (resposta: CertidaoResponse | Blob) => {
  const target = '_blank';
  if (resposta instanceof Blob) {
    const url = URL.createObjectURL(resposta);
    window.open(url, target, 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return undefined;
  }
  if (resposta?.url) {
    window.open(resposta.url, target, 'noopener,noreferrer');
    return resposta;
  }
  if (resposta?.pdfBase64) {
    const cleaned = resposta.pdfBase64.includes(',') ? resposta.pdfBase64.split(',')[1] : resposta.pdfBase64;
    const decode =
      typeof window !== 'undefined' && typeof window.atob === 'function'
        ? window.atob
        : (input: string) => {
            if (typeof Buffer !== 'undefined') {
              return Buffer.from(input, 'base64').toString('binary');
            }
            throw new Error('Decodificador base64 indisponível.');
          };
    const binary = decode(cleaned);
    const len = binary.length;
    const buffer = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) buffer[i] = binary.charCodeAt(i);
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, target, 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return resposta;
  }
  throw new Error('Resposta inesperada ao emitir a certidão.');
};

const CertidaoNegativaPage: React.FC = () => {
  const { toast } = useToast();
  const [documento, setDocumento] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [tipoCertidao, setTipoCertidao] = React.useState<CertidaoNegativaTipo | ''>('');
  const [inscricaoMunicipal, setInscricaoMunicipal] = React.useState('');
  const [ultimaCertidao, setUltimaCertidao] = React.useState<CertidaoResponse | null>(null);

  React.useEffect(() => {
    if (!enableBackend) {
      silentRedirect(SIG_LINKS.CERTIDOES, { src: 'portal', feature: 'certidao-negativa' });
    }
  }, []);

  const emitir = useMutation({
    mutationFn: async () => {
      if (!documento || !nome || !tipoCertidao) {
        throw new Error('Preencha os campos obrigatórios para emitir a certidão.');
      }
      const payload = {
        cpfCnpj: onlyDigits(documento),
        nome: nome.trim(),
        tipoCertidao: tipoCertidao as CertidaoNegativaTipo,
        inscricaoMunicipal: inscricaoMunicipal.trim() || undefined,
      };
      return emitirCertidaoNegativa(payload);
    },
    onSuccess: resposta => {
      try {
        const info = abrirCertidao(resposta);
        if (info) setUltimaCertidao(info);
        toast({
          title: 'Certidão emitida',
          description: info?.codigoValidacao
            ? `Código de validação: ${info.codigoValidacao}`
            : 'A certidão foi aberta em uma nova aba.',
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Não foi possível abrir a certidão.';
        toast({ title: 'Erro ao abrir certidão', description: message });
      }
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível emitir a certidão.';
      toast({ title: 'Erro na emissão', description: message });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    emitir.mutate();
  };

  const codigoValidacao = ultimaCertidao?.codigoValidacao;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link to="/servicos/certidoes" className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <FileCheck className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Certidão Negativa de Débitos</h1>
            <p className="text-lg text-muted-foreground">
              Emita e baixe a certidão negativa diretamente no portal.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Dados para emissão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="documento">CPF/CNPJ *</Label>
                  <Input
                    id="documento"
                    value={documento}
                    onChange={event => setDocumento(onlyDigits(event.target.value))}
                    placeholder="Somente números"
                    inputMode="numeric"
                    maxLength={14}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome / Razão social *</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                    placeholder="Informe o nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de certidão *</Label>
                  <Select value={tipoCertidao} onValueChange={value => setTipoCertidao(value as CertidaoNegativaTipo)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de certidão" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCertidao.map(tipo => (
                        <SelectItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(tipoCertidao === 'iss' || tipoCertidao === 'geral') && (
                  <div className="space-y-2">
                    <Label htmlFor="inscricaoMunicipal">Inscrição municipal</Label>
                    <Input
                      id="inscricaoMunicipal"
                      value={inscricaoMunicipal}
                      onChange={event => setInscricaoMunicipal(event.target.value.toUpperCase())}
                      placeholder="Opcional, quando aplicável"
                    />
                  </div>
                )}

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>A certidão negativa é emitida gratuitamente e possui validade de 60 dias.</p>
                    <p>Certifique-se de que não existam débitos em aberto e que os dados cadastrais estejam atualizados.</p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-gradient-primary hover:bg-primary/90" disabled={emitir.isPending}>
                  {emitir.isPending ? 'Emitindo...' : <><Download className="w-4 h-4 mr-2" />Emitir certidão</>}
                </Button>
              </form>
            </CardContent>
          </Card>

          {ultimaCertidao && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Dados da certidão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Contribuinte: <span className="font-medium text-foreground">{formatCpfCnpj(onlyDigits(documento))} — {nome}</span></p>
                {ultimaCertidao.emitidaEm && <p>Emitida em: <span className="font-medium text-foreground">{ultimaCertidao.emitidaEm}</span></p>}
                {ultimaCertidao.validade && <p>Validade até: <span className="font-medium text-foreground">{ultimaCertidao.validade}</span></p>}
                {codigoValidacao && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 flex items-center gap-2"
                    onClick={() => {
                      if (navigator?.clipboard?.writeText) {
                        navigator.clipboard
                          .writeText(codigoValidacao)
                          .then(() => {
                            toast({ title: 'Código copiado', description: 'Código de validação copiado para a área de transferência.' });
                          })
                          .catch(() => {
                            toast({ title: 'Não foi possível copiar', description: codigoValidacao });
                          });
                      } else {
                        toast({ title: 'Copie manualmente', description: codigoValidacao });
                      }
                    }}
                  >
                    <ClipboardCopy className="w-4 h-4" />
                    Código de validação: {codigoValidacao}
                  </Button>
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

export default CertidaoNegativaPage;
