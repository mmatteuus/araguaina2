import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft, ExternalLink, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const BaixaMEIPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <XCircle className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Baixa do MEI
            </h1>
            <p className="text-xl text-muted-foreground">
              Cancelamento do CNPJ MEI
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Importante saber
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Baixa Definitiva</h3>
                    <p className="text-muted-foreground text-sm">Cancelamento do CNPJ MEI</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Sem Pendências</h3>
                    <p className="text-muted-foreground text-sm">Quitar todas as obrigações</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Processo Irreversível</h3>
                    <p className="text-muted-foreground text-sm">Baixa não pode ser desfeita</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Declarações em Dia</h3>
                    <p className="text-muted-foreground text-sm">DASN e DAS quitados</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Solicitar Baixa</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o portal oficial do governo para solicitar a baixa do MEI
              </p>
              <Button asChild size="lg" variant="primaryGradient">
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

export default BaixaMEIPage;


