import { ArrowLeft, Leaf, AlertCircle, ExternalLink, FileText, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DigitalSignature from "@/components/DigitalSignature";

const LicenciamentoAmbientalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Serviços
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-foreground">Licenciamento Ambiental</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Obtenha licenças ambientais para atividades e empreendimentos
            </p>
          </div>

          <Card className="p-6 mb-6 border-l-4 border-l-green-500">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-green-500" />
              Informações Importantes
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>• O licenciamento ambiental é obrigatório para atividades potencialmente poluidoras</p>
              <p>• O processo varia conforme o tipo e porte do empreendimento</p>
              <p>• Documentação completa acelera a análise do processo</p>
              <p>• Consulte sempre a legislação ambiental municipal vigente</p>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Tipos de Licenças:</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Licença Prévia</h3>
                <p className="text-sm text-muted-foreground">Aprovação da viabilidade ambiental do projeto</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Licença de Instalação</h3>
                <p className="text-sm text-muted-foreground">Autorização para construção do empreendimento</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Licença de Operação</h3>
                <p className="text-sm text-muted-foreground">Autorização para funcionamento da atividade</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Processo de Licenciamento:</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Identifique o tipo de licença necessária para sua atividade</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Prepare a documentação exigida</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>Protocole o requerimento no sistema</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span>Acompanhe a análise técnica</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                <span>Retire sua licença após aprovação</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Acessar Sistema de Licenciamento</h3>
            <p className="text-muted-foreground mb-6">
              Entre no sistema oficial para iniciar seu processo de licenciamento ambiental
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => window.open("http://moderniza.araguaina.to.gov.br/Publico/LicenciamentoAmb/Pagina/home", "_blank")}
            >
              <ExternalLink className="w-5 h-5" />
              Acessar Sistema
            </Button>
          </Card>

          <DigitalSignature />
        </div>
      </div>
    </div>
  );
};

export default LicenciamentoAmbientalPage;