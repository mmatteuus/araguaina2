import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, ExternalLink, DollarSign, FileText, Eye, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const TransparenciaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Eye className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Portal da Transparência
            </h1>
            <p className="text-xl text-muted-foreground">
              Consulte informações sobre gastos públicos e licitações
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Informações Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Receitas e Despesas</h3>
                    <p className="text-muted-foreground text-sm">Consulte orçamento e execução financeira</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Licitações</h3>
                    <p className="text-muted-foreground text-sm">Acompanhe licitações e contratos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Servidores Públicos</h3>
                    <p className="text-muted-foreground text-sm">Informações sobre servidores municipais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BarChart className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Relatórios</h3>
                    <p className="text-muted-foreground text-sm">Relatórios de gestão e prestação de contas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Portal da Transparência</h3>
              <p className="text-muted-foreground mb-4">
                Acesse informações públicas sobre a gestão municipal
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://transparencia.araguaina.to.gov.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Transparência</span>
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

export default TransparenciaPage;


