import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowLeft, Download, FileText, DollarSign, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const VTNPage = () => {
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
              <MapPin className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Valores de Terra Nua (VTN)
            </h1>
            <p className="text-xl text-muted-foreground">
              Tabela oficial de valores de terra nua para cálculo tributário
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Sobre os Valores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Base de Cálculo</h3>
                    <p className="text-muted-foreground text-sm">Valores para cálculo do IPTU</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calculator className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Atualização Anual</h3>
                    <p className="text-muted-foreground text-sm">Valores atualizados por lei municipal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Por Zona Fiscal</h3>
                    <p className="text-muted-foreground text-sm">Valores diferenciados por região</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Tabela Oficial</h3>
                    <p className="text-muted-foreground text-sm">Documento legal vigente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Consultar Tabela VTN</h3>
              <p className="text-muted-foreground mb-4">
                Baixe a tabela oficial de valores de terra nua
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="/documentos/tabela-vtn.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Baixar Tabela</span>
                  <Download className="w-4 h-4" />
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

export default VTNPage;

