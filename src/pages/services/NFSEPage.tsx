import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, ExternalLink, Building, CreditCard, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const NFSEPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Emitir NFS-e
            </h1>
            <p className="text-xl text-muted-foreground">
              Emissão de Nota Fiscal Eletrônica de Serviços
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Funcionalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Empresas Cadastradas</h3>
                    <p className="text-muted-foreground text-sm">Para prestadores de serviços</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Emissão Online</h3>
                    <p className="text-muted-foreground text-sm">Sistema web disponível 24h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Cálculo ISS</h3>
                    <p className="text-muted-foreground text-sm">Cálculo automático dos impostos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Validação</h3>
                    <p className="text-muted-foreground text-sm">Verificação de autenticidade</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Sistema NFS-e</h3>
              <p className="text-muted-foreground mb-4">
                Entre no sistema oficial para emitir suas notas fiscais eletrônicas
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://araguainato.webiss.com.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Sistema</span>
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

export default NFSEPage;
