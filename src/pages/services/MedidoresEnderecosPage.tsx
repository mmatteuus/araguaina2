import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowLeft, Download, FileText, Navigation, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const MedidoresEnderecosPage = () => {
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
              Medidores - Lista de Endereços
            </h1>
            <p className="text-xl text-muted-foreground">
              Localização completa dos medidores de velocidade
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Informações Disponíveis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Navigation className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Endereços Completos</h3>
                    <p className="text-muted-foreground text-sm">Localização exata dos equipamentos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Car className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Tipo de Via</h3>
                    <p className="text-muted-foreground text-sm">Classificação das vias monitoradas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Lista Atualizada</h3>
                    <p className="text-muted-foreground text-sm">Documento sempre atualizado</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Coordenadas</h3>
                    <p className="text-muted-foreground text-sm">Localização geográfica precisa</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Baixar Lista de Endereços</h3>
              <p className="text-muted-foreground mb-4">
                Acesse a lista completa com todos os endereços dos medidores
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/upload/documentos/lista-enderecos-medidores.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Baixar Lista</span>
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

export default MedidoresEnderecosPage;