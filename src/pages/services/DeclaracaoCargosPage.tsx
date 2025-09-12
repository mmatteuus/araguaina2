import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, ArrowLeft, ExternalLink, FileText, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const DeclaracaoCargosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Serviços
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <UserCheck className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Declaração de Acumulação de Cargos
            </h1>
            <p className="text-xl text-muted-foreground">
              Declaração para acumulação de cargos públicos
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                Processo de Declaração
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Nova Declaração</h3>
                    <p className="text-muted-foreground text-sm">Faça sua declaração online</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Requisitos</h3>
                    <p className="text-muted-foreground text-sm">Consulte os requisitos legais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Validação</h3>
                    <p className="text-muted-foreground text-sm">Verificação de compatibilidade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Orientações</h3>
                    <p className="text-muted-foreground text-sm">Diretrizes legais importantes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Fazer Declaração</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o formulário oficial de declaração
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/declaracao-de-acumulacao-de-cargos-publicos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Fazer Declaração</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeclaracaoCargosPage;
