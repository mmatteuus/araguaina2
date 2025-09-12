import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, ExternalLink, MessageSquare, ThumbsUp, AlertTriangle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const OuvidoriaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <MessageSquare className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ouvidoria Municipal
            </h1>
            <p className="text-xl text-muted-foreground">
              Registre sugestões, reclamações e elogios
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Tipos de Manifestação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Reclamações</h3>
                    <p className="text-muted-foreground text-sm">Relate problemas nos serviços municipais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Sugestões</h3>
                    <p className="text-muted-foreground text-sm">Envie sugestões de melhorias</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ThumbsUp className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Elogios</h3>
                    <p className="text-muted-foreground text-sm">Reconheça bons serviços prestados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Acompanhar</h3>
                    <p className="text-muted-foreground text-sm">Consulte o andamento das manifestações</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Fazer Manifestação</h3>
              <p className="text-muted-foreground mb-4">
                Sua opinião é importante para melhorar os serviços municipais
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://www.araguaina.to.gov.br/ouvidoria" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar Ouvidoria</span>
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

export default OuvidoriaPage;


