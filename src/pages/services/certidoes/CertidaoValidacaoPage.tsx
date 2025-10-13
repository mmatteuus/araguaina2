import * as React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Search, ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { validarCertidao, type ValidarCertidaoResponse } from '@/services/certidoes';

const CertidaoValidacaoPage: React.FC = () => {
  const { toast } = useToast();
  const [codigo, setCodigo] = React.useState('');

  const validar = useMutation({
    mutationFn: async (value: string) => validarCertidao(value),
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Não foi possível validar a certidão.';
      toast({ title: 'Erro na validação', description: message });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!codigo.trim()) {
      toast({ title: 'Informe o código', description: 'Digite o código de validação presente na certidão.' });
      return;
    }
    validar.mutate(codigo.trim());
  };

  const resultado: ValidarCertidaoResponse | undefined = validar.data;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Link to="/servicos/certidoes" className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Search className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Validação de Certidão</h1>
            <p className="text-lg text-muted-foreground">
              Confirme a autenticidade de uma certidão emitida pelo município de Araguaína.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Validar certidão</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código de validação</Label>
                  <Input
                    id="codigo"
                    value={codigo}
                    onChange={event => setCodigo(event.target.value.toUpperCase())}
                    placeholder="Digite o código informado na certidão"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={validar.isPending}>
                  {validar.isPending ? 'Validando...' : 'Validar certidão'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {resultado && (
            <Card className={resultado.valido ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}>
              <CardHeader className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {resultado.valido ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">Certidão válida</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-700">Certidão inválida</span>
                    </>
                  )}
                </div>
                {resultado.tipo && (
                  <Badge variant="outline" className="w-fit">
                    {resultado.tipo}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {resultado.nome && (
                  <p>
                    Contribuinte: <span className="font-medium text-foreground">{resultado.nome}</span>
                  </p>
                )}
                {resultado.cpfCnpj && (
                  <p>
                    Documento: <span className="font-medium text-foreground">{resultado.cpfCnpj}</span>
                  </p>
                )}
                {resultado.emitidaEm && (
                  <p>
                    Emitida em: <span className="font-medium text-foreground">{resultado.emitidaEm}</span>
                  </p>
                )}
                {resultado.validade && (
                  <p>
                    Válida até: <span className="font-medium text-foreground">{resultado.validade}</span>
                  </p>
                )}
                {resultado.mensagem && <p className="text-muted-foreground mt-2">{resultado.mensagem}</p>}
              </CardContent>
            </Card>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CertidaoValidacaoPage;
