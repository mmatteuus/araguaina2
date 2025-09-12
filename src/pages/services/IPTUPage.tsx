import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, ArrowLeft, ExternalLink, FileText, Calculator, Calendar, Search, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const IPTUPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CreditCard className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              IPTU - Consulta e Emissão de Guias
            </h1>
            <p className="text-xl text-muted-foreground">
              Gerencie seus impostos prediais de forma simples e rápida
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                O que você pode fazer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/servicos/iptu/consulta" className="block">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                    <Search className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Consultar Débitos</h3>
                      <p className="text-muted-foreground text-sm">Veja todos os débitos pendentes do seu imóvel</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/servicos/iptu/emissao" className="block">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                    <Printer className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Emitir Guias</h3>
                      <p className="text-muted-foreground text-sm">Gere guias de pagamento atualizadas</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/servicos/iptu/parcelamento" className="block">
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                    <Calendar className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Parcelamento</h3>
                      <p className="text-muted-foreground text-sm">Solicite parcelamento de débitos</p>
                    </div>
                  </div>
                </Link>
                
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/iptu/historico" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                    <FileText className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Histórico</h3>
                      <p className="text-muted-foreground text-sm">Consulte o histórico de pagamentos</p>
                    </div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2 text-center">Pronto para acessar o serviço?</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Você será redirecionado para o portal oficial da Prefeitura de Araguaína
              </p>
              <div className="text-center">
                <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                  <a 
                    href="https://www.araguaina.to.gov.br/servicos/iptu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2"
                  >
                    <span>Acessar IPTU Online</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default IPTUPage;
