import { ArrowLeft, AlertCircle, ExternalLink, FileText, Car, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { NavbarAccessibilityButtons } from "@/components/NavbarAccessibilityButtons";

const DATPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <NavbarAccessibilityButtons />
        <Link
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Serviços
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Car className="w-8 h-8 text-red-600" />
              <h1 className="text-3xl font-bold text-foreground">DAT - Declaração de Acidente de Trânsito</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Sistema online para registro de acidentes de trânsito sem vítimas
            </p>
          </div>

          <Card className="p-6 mb-6 border-l-4 border-l-red-500">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Atenção - Uso do DAT
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>• <strong>APENAS para acidentes SEM vítimas</strong></p>
              <p>• Em caso de vítimas, acione imediatamente o SAMU (192) e a Polícia (190)</p>
              <p>• O DAT substitui o Boletim de Ocorrência para acidentes simples</p>
              <p>• Ambos os condutores devem concordar com o preenchimento</p>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quando usar o DAT:</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Acidentes sem vítimas (apenas danos materiais)</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ambos os condutores são habilitados</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Veículos em condições de circular</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Não há suspeita de embriaguez</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Como preencher o DAT:</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Tenha em mãos os documentos dos veículos e condutores</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Acesse o sistema DAT municipal</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>Preencha todos os dados solicitados</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span>Registre o acordo entre as partes</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                <span>Imprima e guarde o protocolo gerado</span>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Emergências</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                  <span className="font-semibold">SAMU</span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    192
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <span className="font-semibold">Polícia</span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    190
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-4">Acessar Sistema DAT</h3>
              <p className="text-muted-foreground mb-6">
                Registre seu acidente de trânsito online
              </p>
              <Button 
                size="lg" 
                className="gap-2 w-full"
                onClick={() => window.open("https://dat.araguaina.to.gov.br/", "_blank")}
              >
                <ExternalLink className="w-5 h-5" />
                Sistema DAT
              </Button>
            </Card>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DATPage;