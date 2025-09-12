import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, FileText, AlertCircle, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const MultasConsultaPage = () => {
  const [placa, setPlaca] = useState("");
  const [renavam, setRenavam] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");

  const handleConsulta = () => {
    if (!placa || !tipoConsulta) {
      alert("Por favor, preencha a placa e selecione o tipo de consulta");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura (Perkons)
    window.open(`https://controlpk-to.perkons.com.br/consulta/index.php?placa=${placa}&renavam=${renavam}&documento=${cpfCnpj}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Car className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Consulta de Multas de Trânsito
            </h1>
            <p className="text-xl text-muted-foreground">
              Consulte infrações e multas do seu veículo
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Dados do Veículo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="placa">Placa do Veículo *</Label>
                <Input
                  id="placa"
                  placeholder="ABC-1234 ou ABC1D23"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoConsulta">Tipo de Consulta *</Label>
                <Select value={tipoConsulta} onValueChange={setTipoConsulta}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multas">Consultar Multas</SelectItem>
                    <SelectItem value="pontos">Consultar Pontos CNH</SelectItem>
                    <SelectItem value="vencimentos">Próximos Vencimentos</SelectItem>
                    <SelectItem value="historico">Histórico de Infrações</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="renavam">RENAVAM (Opcional)</Label>
                <Input
                  id="renavam"
                  placeholder="Digite o RENAVAM"
                  value={renavam}
                  onChange={(e) => setRenavam(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ do Proprietário (Opcional)</Label>
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
                      <li>• Aceita placas no formato antigo (ABC-1234) e Mercosul (ABC1D23)</li>
                      <li>• Para consultas completas, informe RENAVAM e CPF</li>
                      <li>• Multas podem levar até 30 dias para aparecer no sistema</li>
                      <li>• Guarde sempre o comprovante de pagamento</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Atenção - Multas em atraso:</p>
                    <ul className="text-xs text-red-700 mt-2 space-y-1">
                      <li>• Após 30 dias do vencimento: acréscimo de 80% + juros</li>
                      <li>• Inscrição em dívida ativa após 60 dias</li>
                      <li>• Pode haver bloqueio do veículo no DETRAN</li>
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
                Consultar Multas
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MultasConsultaPage;
