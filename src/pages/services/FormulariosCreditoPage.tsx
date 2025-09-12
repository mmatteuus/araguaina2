import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, ExternalLink, FileText, Download, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const FormulariosCreditoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <GraduationCap className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Formulários Crédito Educativo
            </h1>
            <p className="text-xl text-muted-foreground">
              Documentos necessários para crédito educativo
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Documentos Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Formulário de Solicitação</h3>
                    <p className="text-muted-foreground text-sm">Pedido de crédito educativo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Documentação Necessária</h3>
                    <p className="text-muted-foreground text-sm">Lista de documentos obrigatórios</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Termo de Compromisso</h3>
                    <p className="text-muted-foreground text-sm">Compromissos do beneficiário</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Comprovação de Estudo</h3>
                    <p className="text-muted-foreground text-sm">Documentos acadêmicos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Formulários</h3>
              <p className="text-muted-foreground mb-4">
                Baixe todos os formulários necessários para o crédito educativo
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/formularios-credito-educativo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Baixar Formulários</span>
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

export default FormulariosCreditoPage;


