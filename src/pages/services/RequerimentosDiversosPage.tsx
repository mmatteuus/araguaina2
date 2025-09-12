import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, ArrowLeft, Download, FileText, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const RequerimentosDiversosPage = () => {
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
              <ClipboardList className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Requerimentos Diversos (RD)
            </h1>
            <p className="text-xl text-muted-foreground">
              Formulário de requerimentos diversos para servidores
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClipboardList className="w-5 h-5 mr-2" />
                Tipos de Requerimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Certidões</h3>
                    <p className="text-muted-foreground text-sm">Solicitação de certidões diversas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Benefícios</h3>
                    <p className="text-muted-foreground text-sm">Auxílios e benefícios funcionais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Alterações Cadastrais</h3>
                    <p className="text-muted-foreground text-sm">Mudança de dados pessoais</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClipboardList className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Outros Assuntos</h3>
                    <p className="text-muted-foreground text-sm">Demais solicitações administrativas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Baixar Formulário</h3>
              <p className="text-muted-foreground mb-4">
                Baixe o formulário de requerimentos diversos (RD)
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="/formularios/requerimentos-diversos.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Baixar Formulário</span>
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

export default RequerimentosDiversosPage;
