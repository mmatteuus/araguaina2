import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import DigitalSignature from "@/components/DigitalSignature";
import { useState } from "react";

const IPTUConsultaPage = () => {
  const [inscricao, setInscricao] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");

  const handleConsulta = () => {
    if (!inscricao || !cpfCnpj) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://www.araguaina.to.gov.br/servicos/iptu/consulta?inscricao=${inscricao}&documento=${cpfCnpj}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/servicos/iptu" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para IPTU
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Consulta de IPTU
            </h1>
            <p className="text-xl text-muted-foreground">
              Consulte débitos e histórico do seu imóvel
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Dados para Consulta
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

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Informações importantes:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• A inscrição imobiliária está no carnê do IPTU</li>
                      <li>• Use apenas números no CPF/CNPJ</li>
                      <li>• Dados obrigatórios para consulta</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleConsulta}
                className="w-full bg-gradient-primary hover:bg-primary/90"
                size="lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Consultar IPTU
              </Button>
            </CardContent>
          </Card>

          <DigitalSignature />
        </div>
      </div>
    </div>
  );
};

export default IPTUConsultaPage;