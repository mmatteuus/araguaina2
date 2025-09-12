import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Printer, FileText, AlertCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

import { useState } from "react";

const IPTUEmissaoPage = () => {
  const [inscricao, setInscricao] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [exercicio, setExercicio] = useState("");

  const handleEmissao = () => {
    if (!inscricao || !cpfCnpj || !exercicio) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://www.araguaina.to.gov.br/servicos/iptu/emitir-guia?inscricao=${inscricao}&documento=${cpfCnpj}&exercicio=${exercicio}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-6">
          <Link to="/servicos/iptu" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para IPTU
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Printer className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Emissão de Guias IPTU
            </h1>
            <p className="text-xl text-muted-foreground">
              Gere guias de pagamento atualizadas
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Dados para Emissão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inscricao">Inscrição Imobiliária</Label>
                <Input
                  id="inscricao"
                  placeholder="Digite a inscrição do imóvel"
                  value={inscricao}
                  onChange={(e) => setInscricao(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ do Proprietário</Label>
                <Input
                  id="cpfCnpj"
                  placeholder="Digite o CPF ou CNPJ"
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exercicio">Exercício</Label>
                <Select value={exercicio} onValueChange={setExercicio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Tipos de guias disponíveis:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Guia para pagamento à vista</li>
                      <li>• Guia para pagamento parcelado</li>
                      <li>• Guia de cotas em atraso</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleEmissao}
                variant="primaryGradient" className="w-full"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Emitir Guia de Pagamento
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default IPTUEmissaoPage;

