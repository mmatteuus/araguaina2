import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeft, ExternalLink, FileText, Search, Download, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const CodigoPosturaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
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
              Código de Postura
            </h1>
            <p className="text-xl text-muted-foreground">
              Regulamentos e normas de postura do município
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Conteúdo do Código
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Normas de Postura</h3>
                    <p className="text-muted-foreground text-sm">Regulamentos urbanos e comerciais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Scale className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Legislação Municipal</h3>
                    <p className="text-muted-foreground text-sm">Leis e decretos municipais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Busca por Artigo</h3>
                    <p className="text-muted-foreground text-sm">Encontre artigos específicos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Download</h3>
                    <p className="text-muted-foreground text-sm">Baixe o código completo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Consultar Código de Postura</h3>
              <p className="text-muted-foreground mb-4">
                Acesse as normas de postura do município
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/codigo-de-postura-do-municipio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Código</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodigoPosturaPage;