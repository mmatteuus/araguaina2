import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowLeft, ExternalLink, FileText, Building, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const ISSPage = () => {
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
              <Building className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              ISS - Imposto Sobre Serviços
            </h1>
            <p className="text-xl text-muted-foreground">
              Gerencie o ISS da sua empresa de forma digital
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Serviços Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Consultar Débitos</h3>
                    <p className="text-muted-foreground text-sm">Veja débitos de ISS da sua empresa</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Emitir Guias</h3>
                    <p className="text-muted-foreground text-sm">Gere guias de pagamento do ISS</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Declarações</h3>
                    <p className="text-muted-foreground text-sm">Faça declarações mensais de serviços</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Inscrição Municipal</h3>
                    <p className="text-muted-foreground text-sm">Consulte dados da inscrição</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Portal do ISS</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o sistema oficial para gerenciar o ISS da sua empresa
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/iss" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar ISS Online</span>
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

export default ISSPage;


