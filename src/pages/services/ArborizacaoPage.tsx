import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, ArrowLeft, ExternalLink, FileText, Download, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const ArborizacaoPage = () => {
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
              <Leaf className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Plano de Arborização Urbana
            </h1>
            <p className="text-xl text-muted-foreground">
              Plano municipal de arborização e meio ambiente
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="w-5 h-5 mr-2" />
                Sobre o Plano
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Mapeamento Urbano</h3>
                    <p className="text-muted-foreground text-sm">Áreas de arborização da cidade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Leaf className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Espécies Nativas</h3>
                    <p className="text-muted-foreground text-sm">Plantas adequadas ao clima local</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Documento Oficial</h3>
                    <p className="text-muted-foreground text-sm">PDF com plano completo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Diretrizes</h3>
                    <p className="text-muted-foreground text-sm">Normas e orientações técnicas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Consultar Plano de Arborização</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o documento completo do plano municipal de arborização urbana
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/upload/documentos/plano-de-arborizacao.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Baixar Plano</span>
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

export default ArborizacaoPage;
