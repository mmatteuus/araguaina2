import * as React from 'react';
import { useLocation, useNavigate, type Location } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Footer } from '@/components/Footer';

type LocationState = {
  from?: Location;
};

const LoginPage: React.FC = () => {
  const { toast } = useToast();
  const { login, isAuthenticated, initialized, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const state = location.state as LocationState | undefined;
  const params = new URLSearchParams(location.search);
  const nextParam = params.get('next');

  const redirectTo = React.useMemo(() => {
    if (nextParam) return nextParam;
    if (state?.from) {
      const { pathname, search, hash } = state.from;
      return `${pathname}${search ?? ''}${hash ?? ''}`;
    }
    return '/';
  }, [nextParam, state?.from]);

  React.useEffect(() => {
    if (initialized && isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [initialized, isAuthenticated, navigate, redirectTo]);

  const mutation = useMutation({
    mutationFn: async () => {
      setError(null);
      await login({ username: username.trim(), password, remember });
    },
    onSuccess: () => {
      toast({ title: 'Login realizado com sucesso!' });
      navigate(redirectTo, { replace: true });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Não foi possível entrar. Verifique os dados e tente novamente.';
      setError(message);
      toast({ title: 'Falha no login', description: message });
    },
  });

  const isSubmitting = mutation.isPending || isLoggingIn;
  const canSubmit = username.trim().length > 0 && password.length > 0 && !isSubmitting;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    mutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex flex-col">
      <div className="flex-1 container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-lg border border-primary/10">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Acesso ao Portal</CardTitle>
            <CardDescription>Informe suas credenciais utilizadas nos serviços do SIG para continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username">CPF/CNPJ ou E-mail</Label>
                <Input
                  id="username"
                  autoComplete="username"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  placeholder="Ex.: 12345678900"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => {
                      toast({
                        title: 'Esqueci minha senha',
                        description: 'Procure a Central de Atendimento da Prefeitura para redefinir sua senha.',
                      });
                    }}
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={remember} onCheckedChange={value => setRemember(Boolean(value))} />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  Manter minha sessão ativa neste dispositivo
                </label>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <Button type="submit" className="w-full" size="lg" disabled={!canSubmit}>
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 text-xs text-muted-foreground space-y-2">
              <p>
                Este portal utiliza autenticação com token (JWT). Ao entrar, você autoriza o uso do seu acesso para
                consultar e emitir documentos fiscais em nome do titular informado.
              </p>
              <p>
                Por segurança, sua sessão é encerrada automaticamente ao detectar inatividade ou expiração do token. Use a
                opção sair para encerrar o acesso em computadores compartilhados.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
