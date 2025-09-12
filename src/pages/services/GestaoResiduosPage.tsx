import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recycle, ArrowLeft, ExternalLink, FileText, Download, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const GestaoResiduosPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-6">
          <Link to="/" className="inline-flex items-centers text-primary hover:text-primary/80 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Serviços
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Recycle className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Plano de Gestão de Resíduos Sólidos
            </h1>
            <p className="text-xl text-muted-foreground">
              Gestão integrada de resíduos sólidos do município
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Recycle className="w-5 h-5 mr-2" />
                Sobre o Plano
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Recycle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Coleta Seletiva</h3>
                    <p className="text-muted-foreground text-sm">Programa municipal de reciclagem</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Leaf className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Sustentabilidade</h3>
                    <p className="text-muted-foreground text-sm">Práticas ambientais sustentáveis</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Diagnóstico Municipal</h3>
                    <p className="text-muted-foreground text-sm">Situação atual dos resíduos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Documento Oficial</h3>
                    <p className="text-muted-foreground text-sm">PDF com plano completo</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Consultar Plano de Resíduos</h3>
              <p className="text-muted-foreground mb-4">
                Acesse o documento completo do plano de gestão integrada de resíduos sólidos
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="https://www.araguaina.to.gov.br/upload/documentos/plano-gestao-residuos.pdf" 
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

export default GestaoResiduosPage;

