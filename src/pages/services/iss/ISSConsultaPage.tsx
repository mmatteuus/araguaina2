import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const ISSConsultaPage = () => {
  const [cnpj, setCnpj] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");

  const handleConsulta = () => {
    if (!cnpj || !inscricaoMunicipal || !tipoConsulta) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-contribuinte?cnpj=${cnpj}&inscricao=${inscricaoMunicipal}&tipo=${tipoConsulta}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Consulta de ISS
            </h1>
            <p className="text-xl text-muted-foreground">
              Consulte débitos e histórico do ISS da sua empresa
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
                <Label htmlFor="cnpj">CNPJ da Empresa</Label>
                <Input
                  id="cnpj"
                  placeholder="Digite o CNPJ (apenas números)"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                <Input
                  id="inscricaoMunicipal"
                  placeholder="Digite a inscrição municipal"
                  value={inscricaoMunicipal}
                  onChange={(e) => setInscricaoMunicipal(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoConsulta">Tipo de Consulta</Label>
                <Select value={tipoConsulta} onValueChange={setTipoConsulta}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debitos">Consultar Débitos</SelectItem>
                    <SelectItem value="historico">Histórico de Pagamentos</SelectItem>
                    <SelectItem value="certidao">Emitir Certidão Negativa</SelectItem>
                    <SelectItem value="alvara">Situação do Alvará</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Informações importantes:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• A inscrição municipal está no alvará de funcionamento</li>
                      <li>• Use apenas números no CNPJ</li>
                      <li>• Certidão negativa é emitida apenas para empresas em dia</li>
                      <li>• Para dúvidas, procure a Secretaria da Fazenda</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleConsulta}
                variant="primaryGradient" className="w-full"
                size="lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Consultar ISS
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ISSConsultaPage;


