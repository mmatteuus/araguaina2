import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Download, FileText, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const LicencaAperfeicoamentoPage = () => {
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
              <GraduationCap className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Licença para Aperfeiçoamento
            </h1>
            <p className="text-xl text-muted-foreground">
              Formulário de licença para aperfeiçoamento profissional
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Sobre a Licença
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Finalidade</h3>
                    <p className="text-muted-foreground text-sm">Cursos de especialização e pós-graduação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Duração</h3>
                    <p className="text-muted-foreground text-sm">Período do curso ou capacitação</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Documentação</h3>
                    <p className="text-muted-foreground text-sm">Comprovação de matrícula</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <GraduationCap className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Benefício</h3>
                    <p className="text-muted-foreground text-sm">Melhoria da qualificação profissional</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Baixar Formulário</h3>
              <p className="text-muted-foreground mb-4">
                Baixe o formulário de solicitação de licença para aperfeiçoamento
              </p>
              <Button asChild size="lg" variant="primaryGradient">
                <a 
                  href="/formularios/licenca-aperfeicoamento.pdf" 
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

export default LicencaAperfeicoamentoPage;

