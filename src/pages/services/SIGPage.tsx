import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, ArrowLeft, ExternalLink, MapPin, Search, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const SIGPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Map className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Sistema SIG
            </h1>
            <p className="text-xl text-muted-foreground">
              Sistema de Informações Geográficas de Araguaína
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Map className="w-5 h-5 mr-2" />
                Funcionalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Mapeamento Urbano</h3>
                    <p className="text-muted-foreground text-sm">Visualize o território municipal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Buscar Endereços</h3>
                    <p className="text-muted-foreground text-sm">Localize ruas e imóveis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Layers className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Camadas de Informação</h3>
                    <p className="text-muted-foreground text-sm">Dados urbanos integrados</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Map className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Consulta Geográfica</h3>
                    <p className="text-muted-foreground text-sm">Informações espaciais</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Sistema SIG</h3>
              <p className="text-muted-foreground mb-4">
                Entre no sistema de informações geográficas
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://araguaina.prodataweb.inf.br/sig" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar SIG</span>
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

export default SIGPage;
