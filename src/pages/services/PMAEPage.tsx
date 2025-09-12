import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, ArrowLeft, ExternalLink, FileText, Download, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const PMAEPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Droplets className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Plano Municipal de Água e Esgoto
            </h1>
            <p className="text-xl text-muted-foreground">
              PMAE - Planejamento de saneamento básico municipal
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplets className="w-5 h-5 mr-2" />
                Sobre o PMAE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Droplets className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Abastecimento de Água</h3>
                    <p className="text-muted-foreground text-sm">Planejamento do sistema de água</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Rede de Esgoto</h3>
                    <p className="text-muted-foreground text-sm">Mapeamento e expansão da rede</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Documentos Técnicos</h3>
                    <p className="text-muted-foreground text-sm">Estudos e projetos técnicos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">PDFs Disponíveis</h3>
                    <p className="text-muted-foreground text-sm">Múltiplos documentos para download</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Consultar PMAE</h3>
              <p className="text-muted-foreground mb-4">
                Acesse os documentos do Plano Municipal de Água e Esgoto
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/plano-municipal-de-agua-e-esgoto" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Acessar PMAE</span>
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

export default PMAEPage;
