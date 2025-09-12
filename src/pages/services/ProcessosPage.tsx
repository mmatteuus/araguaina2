import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, ExternalLink, Search, Clock, Eye, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const ProcessosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Consulta de Processos
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe processos administrativos municipais
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Funcionalidades Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Buscar Processo</h3>
                    <p className="text-muted-foreground text-sm">Localize processos por número ou CPF/CNPJ</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Acompanhar Andamento</h3>
                    <p className="text-muted-foreground text-sm">Veja o status atual do processo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Visualizar Documentos</h3>
                    <p className="text-muted-foreground text-sm">Acesse documentos do processo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Download de Certidões</h3>
                    <p className="text-muted-foreground text-sm">Baixe certidões e comprovantes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Consultar Processos</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o sistema de consulta de processos administrativos
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/processos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Consultar Processos</span>
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

export default ProcessosPage;
