import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowLeft, ExternalLink, FileText, Building, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const GuiaAlvaraPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CreditCard className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Emitir Guia do Alvará
            </h1>
            <p className="text-xl text-muted-foreground">
              Guia de pagamento para alvará de funcionamento
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Sobre a Guia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Alvará de Funcionamento</h3>
                    <p className="text-muted-foreground text-sm">Licença para abertura de empresa</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Pagamento</h3>
                    <p className="text-muted-foreground text-sm">Guia para quitação das taxas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Emissão Imediata</h3>
                    <p className="text-muted-foreground text-sm">Disponível para download</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Sistema Prodata</h3>
                    <p className="text-muted-foreground text-sm">Plataforma oficial do município</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Sistema</h3>
              <p className="text-muted-foreground mb-4">
                Entre no sistema Prodata para emitir sua guia de alvará
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://araguaina.prodata.inf.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Sistema Prodata</span>
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

export default GuiaAlvaraPage;


