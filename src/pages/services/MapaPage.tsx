import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowLeft, ExternalLink, Navigation, Building, Phone, Search } from "lucide-react";
import { Link } from "react-router-dom";

const MapaPage = () => {
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
              Mapa da Cidade
            </h1>
            <p className="text-xl text-muted-foreground">
              Localize órgãos e serviços públicos em Araguaína
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Funcionalidades do Mapa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Órgãos Públicos</h3>
                    <p className="text-muted-foreground text-sm">Localize secretarias e repartições</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Navigation className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Rotas</h3>
                    <p className="text-muted-foreground text-sm">Obtenha direções para chegar ao destino</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Contatos</h3>
                    <p className="text-muted-foreground text-sm">Telefones e horários de atendimento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Search className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Buscar Endereço</h3>
                    <p className="text-muted-foreground text-sm">Encontre endereços específicos na cidade</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Acessar Mapa Interativo</h3>
              <p className="text-muted-foreground mb-4">
                Explore a cidade e encontre serviços públicos facilmente
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/mapa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Abrir Mapa</span>
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

export default MapaPage;
