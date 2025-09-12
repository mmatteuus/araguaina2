import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowLeft, Download, FileText, UserCheck, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const LicencaFeriasPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Calendar className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Formulário de Férias e LIP
            </h1>
            <p className="text-xl text-muted-foreground">
              Férias e Licença Interesse Particular
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Tipos de Solicitação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Férias Regulares</h3>
                    <p className="text-muted-foreground text-sm">30 dias de descanso remunerado</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <UserCheck className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Licença Interesse Particular</h3>
                    <p className="text-muted-foreground text-sm">Afastamento sem remuneração</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Antecedência</h3>
                    <p className="text-muted-foreground text-sm">Solicitação com 30 dias de antecedência</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Documentação</h3>
                    <p className="text-muted-foreground text-sm">Formulário e documentos comprobatórios</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Baixar Formulário</h3>
              <p className="text-muted-foreground mb-4">
                Baixe o formulário de solicitação de férias e LIP
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="/formularios/ferias-lip.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Baixar Formulário</span>
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

export default LicencaFeriasPage;


