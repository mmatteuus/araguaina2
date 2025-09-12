import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, ArrowLeft, ExternalLink, FileText, Download, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const FICPage = () => {
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
              <ClipboardList className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              FIC - Ficha de Informações Cadastrais
            </h1>
            <p className="text-xl text-muted-foreground">
              Formulário de informações cadastrais do município
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Sobre a FIC
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <UserCheck className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Cadastro Municipal</h3>
                    <p className="text-muted-foreground text-sm">Informações cadastrais no município</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Formulário PDF</h3>
                    <p className="text-muted-foreground text-sm">Documento para preenchimento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Atualização de Dados</h3>
                    <p className="text-muted-foreground text-sm">Mantenha seus dados atualizados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClipboardList className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Documentação</h3>
                    <p className="text-muted-foreground text-sm">Informações necessárias</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Formulário FIC</h3>
              <p className="text-muted-foreground mb-4">
                Baixe o formulário de informações cadastrais
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/ficha-de-informacoes-cadastrais-fic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar FIC</span>
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

export default FICPage;