import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileCheck, FileText, AlertCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const CertidaoNegativaPage = () => {
  const [documento, setDocumento] = useState("");
  const [nome, setNome] = useState("");
  const [tipoCertidao, setTipoCertidao] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");

  const handleEmissao = () => {
    if (!documento || !nome || !tipoCertidao) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-contribuinte`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/servicos/certidoes" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Certidões
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileCheck className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Certidão Negativa de Débitos
            </h1>
            <p className="text-xl text-muted-foreground">
              Emita sua certidão negativa municipal
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
                <Label htmlFor="documento">CPF/CNPJ *</Label>
                <Input
                  id="documento"
                  placeholder="Digite CPF ou CNPJ (apenas números)"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nome">Nome/Razão Social *</Label>
                <Input
                  id="nome"
                  placeholder="Digite o nome completo ou razão social"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoCertidao">Tipo de Certidão *</Label>
                <Select value={tipoCertidao} onValueChange={setTipoCertidao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de certidão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Certidão Geral de Débitos</SelectItem>
                    <SelectItem value="iptu">Certidão Negativa de IPTU</SelectItem>
                    <SelectItem value="iss">Certidão Negativa de ISS</SelectItem>
                    <SelectItem value="taxas">Certidão Negativa de Taxas</SelectItem>
                    <SelectItem value="multas">Certidão Negativa de Multas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(tipoCertidao === "iss" || tipoCertidao === "geral") && (
                <div className="space-y-2">
                  <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                  <Input
                    id="inscricaoMunicipal"
                    placeholder="Digite a inscrição municipal (se possuir)"
                    value={inscricaoMunicipal}
                    onChange={(e) => setInscricaoMunicipal(e.target.value)}
                  />
                </div>
              )}

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <FileCheck className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Validade da Certidão:</p>
                    <ul className="text-xs text-green-700 mt-2 space-y-1">
                      <li>• Certidão válida por 60 dias</li>
                      <li>• Emissão gratuita</li>
                      <li>• Documento com assinatura digital</li>
                      <li>• Aceita para todos os órgãos públicos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Requisitos para emissão:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Não possuir débitos em aberto</li>
                      <li>• Dados atualizados no cadastro municipal</li>
                      <li>• Para empresas: inscrição municipal ativa</li>
                      <li>• Documentos válidos e não vencidos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Se houver débitos pendentes:</p>
                    <ul className="text-xs text-red-700 mt-2 space-y-1">
                      <li>• Quite os débitos antes de solicitar a certidão</li>
                      <li>• Parcelamentos em dia são aceitos</li>
                      <li>• Aguarde 48h após pagamento para emitir</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleEmissao}
                variant="primaryGradient"
                className="w-full"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Emitir Certidão Negativa
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CertidaoNegativaPage;

