import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeft, ExternalLink, FileText, Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const LeisDecretosPage = () => {
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
              <BookOpen className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Leis, Decretos e Portarias
            </h1>
            <p className="text-xl text-muted-foreground">
              Legislação municipal completa e atualizada
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Funcionalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Busca Avançada</h3>
                    <p className="text-muted-foreground text-sm">Encontre leis por palavra-chave</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Por Data</h3>
                    <p className="text-muted-foreground text-sm">Consulte por período de publicação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Texto Integral</h3>
                    <p className="text-muted-foreground text-sm">Acesse o conteúdo completo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Por Categoria</h3>
                    <p className="text-muted-foreground text-sm">Organize por tipo de norma</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Legislação</h3>
              <p className="text-muted-foreground mb-4">
                Consulte todas as leis, decretos e portarias municipais
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://leis.araguaina.to.gov.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Portal de Leis</span>
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

export default LeisDecretosPage;

