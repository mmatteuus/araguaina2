import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, ExternalLink, Users, CreditCard, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const CCMEIPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Emitir CCMEI
            </h1>
            <p className="text-xl text-muted-foreground">
              Certificado da Condição de Microempreendedor Individual
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Sobre o CCMEI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Comprovação</h3>
                    <p className="text-muted-foreground text-sm">Comprova a condição de MEI</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Gratuito</h3>
                    <p className="text-muted-foreground text-sm">Emissão totalmente gratuita</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Download Imediato</h3>
                    <p className="text-muted-foreground text-sm">Documento disponível online</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Validade Legal</h3>
                    <p className="text-muted-foreground text-sm">Documento oficial válido</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Emitir CCMEI</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o portal oficial do governo para emitir seu certificado
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

export default CCMEIPage;
