import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, ExternalLink, FileText, Users, CreditCard, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const CreditoEducativoPage = () => {
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
              <GraduationCap className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Crédito Educativo
            </h1>
            <p className="text-xl text-muted-foreground">
              Programa de financiamento estudantil municipal
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Serviços do Programa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Solicitar Crédito</h3>
                    <p className="text-muted-foreground text-sm">Faça sua solicitação online</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Critérios</h3>
                    <p className="text-muted-foreground text-sm">Consulte requisitos do programa</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Acompanhar Processo</h3>
                    <p className="text-muted-foreground text-sm">Veja status da sua solicitação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Prestações</h3>
                    <p className="text-muted-foreground text-sm">Consulte e quite prestações</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Programa</h3>
              <p className="text-muted-foreground mb-4">
                Invista no seu futuro com o crédito educativo municipal
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/formularios-credito-educativo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Programa</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreditoEducativoPage;
