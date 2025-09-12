import { ArrowLeft, Trash2, AlertCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";

const TaxaLixoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
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
              <Trash2 className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Taxa de Coleta de Lixo</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Emissão de guias para pagamento da taxa de coleta de lixo
            </p>
          </div>

          <Card className="p-6 mb-6 border-l-4 border-l-blue-500">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              Informações Importantes
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>• A taxa de coleta de lixo é cobrada anualmente junto com o IPTU</p>
              <p>• Para emitir a guia, você precisará da inscrição imobiliária</p>
              <p>• O pagamento pode ser feito em qualquer agência bancária conveniada</p>
              <p>• Mantenha sempre em dia para evitar juros e multas</p>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Como emitir sua guia:</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Tenha em mãos a inscrição imobiliária do seu imóvel</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Acesse o sistema oficial da Prefeitura</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>Informe os dados solicitados</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span>Imprima sua guia e efetue o pagamento</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-4">Emitir Guia da Taxa de Lixo</h3>
            <p className="text-muted-foreground mb-6">
              Acesse o sistema oficial para emitir sua guia de pagamento
            </p>
            <Button 
              size="lg" 
              className="gap-2"
              onClick={() => window.open("https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte", "_blank")}
            >
              <ExternalLink className="w-5 h-5" />
              Acessar Sistema Oficial
            </Button>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TaxaLixoPage;
