import { ArrowLeft, CreditCard, AlertCircle, ExternalLink, FileText, Calculator, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";

const ConsignacoesPage = () => {
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
              <CreditCard className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Sistema de Consignações</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Gestão de empréstimos consignados para servidores municipais
            </p>
          </div>

          <Card className="p-6 mb-6 border-l-4 border-l-blue-500">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              Informações Importantes
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>• Serviço exclusivo para servidores públicos municipais</p>
              <p>• Consulte sempre as condições e taxas antes de contratar</p>
              <p>• Mantenha seus dados atualizados no sistema</p>
              <p>• Em caso de dúvidas, procure o RH da sua secretaria</p>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Funcionalidades do Sistema:</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <Search className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Consultar Empréstimos</h3>
                <p className="text-sm text-muted-foreground">Visualize seus empréstimos ativos e histórico</p>
              </div>
              <div className="text-center">
                <Calculator className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Simular Crédito</h3>
                <p className="text-sm text-muted-foreground">Calcule valores e parcelas disponíveis</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Acompanhar Status</h3>
                <p className="text-sm text-muted-foreground">Monitore andamento de solicitações</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Como utilizar o sistema:</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                <span>Acesse o sistema com seu CPF e senha</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                <span>Verifique suas informações cadastrais</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                <span>Consulte empréstimos disponíveis ou ativos</span>
              </div>
              <div className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                <span>Realize simulações conforme sua necessidade</span>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card>
              <h3 className="text-xl font-semibold mb-4">Acessar Sistema</h3>
              <p className="text-muted-foreground mb-6">
                Entre no sistema de consignações
              </p>
              <Button 
                size="lg" 
                className="gap-2 w-full"
                onClick={() => window.open("https://saec.consiglog.com.br/", "_blank")}
              >
                <ExternalLink className="w-5 h-5" />
                Sistema SAEC
              </Button>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold mb-4">Guia do Sistema</h3>
              <p className="text-muted-foreground mb-6">
                Manual de utilização do sistema
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="gap-2 w-full"
                onClick={() => window.open("https://aux.araguaina.to.gov.br/portal/pdf/15.pdf", "_blank")}
              >
                <FileText className="w-5 h-5" />
                Baixar Guia
              </Button>
            </Card>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ConsignacoesPage;