import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, ExternalLink, Download, Lock, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const ContraChequePage = () => {
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
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Contra Cheque - Servidores
            </h1>
            <p className="text-xl text-muted-foreground">
              Acesso ao contracheque para servidores municipais
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Serviços para Servidores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Download Contracheque</h3>
                    <p className="text-muted-foreground text-sm">Baixe seu contracheque atual</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Histórico</h3>
                    <p className="text-muted-foreground text-sm">Consulte contracheques anteriores</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CreditCard className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Informe de Rendimentos</h3>
                    <p className="text-muted-foreground text-sm">Emita informe anual</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Acesso Seguro</h3>
                    <p className="text-muted-foreground text-sm">Login com CPF e senha</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Contracheque</h3>
              <p className="text-muted-foreground mb-4">
                Portal exclusivo para servidores municipais
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/emitir-contra-cheque" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Portal</span>
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

export default ContraChequePage;


