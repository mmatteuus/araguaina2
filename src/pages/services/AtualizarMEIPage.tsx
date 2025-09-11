import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, ArrowLeft, ExternalLink, FileText, Building, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { NavbarAccessibilityButtons } from "@/components/NavbarAccessibilityButtons";

const AtualizarMEIPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <NavbarAccessibilityButtons />
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
              Atualizar Dados do MEI
            </h1>
            <p className="text-xl text-muted-foreground">
              Atualização de dados cadastrais do MEI
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                O que pode ser atualizado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Endereço Comercial</h3>
                    <p className="text-muted-foreground text-sm">Local de funcionamento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Atividades</h3>
                    <p className="text-muted-foreground text-sm">Inclusão ou alteração de atividades</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <UserCheck className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Dados Pessoais</h3>
                    <p className="text-muted-foreground text-sm">Informações do empresário</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Sem Custo</h3>
                    <p className="text-muted-foreground text-sm">Atualização gratuita</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Atualizar MEI</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o portal oficial do governo para atualizar seus dados
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Portal do Governo</span>
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

export default AtualizarMEIPage;