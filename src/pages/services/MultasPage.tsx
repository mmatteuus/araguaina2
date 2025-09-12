import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, ExternalLink, Search, CreditCard, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const MultasPage = () => {
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
              <AlertTriangle className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Consulta de Multas
            </h1>
            <p className="text-xl text-muted-foreground">
              Consulte multas de trânsito e outras infrações
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Serviços de Multas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Consultar Multas</h3>
                    <p className="text-muted-foreground text-sm">Busque multas por placa ou CPF</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Detalhes da Infração</h3>
                    <p className="text-muted-foreground text-sm">Veja detalhes das infrações</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Emitir Guia</h3>
                    <p className="text-muted-foreground text-sm">Gere guia para pagamento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Prazo de Pagamento</h3>
                    <p className="text-muted-foreground text-sm">Verifique prazos e descontos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Consultar Multas Online</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o sistema oficial para consultar suas multas
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/consultar-multas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Consultar Multas</span>
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

export default MultasPage;

