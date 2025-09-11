import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, FileText, AlertCircle, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const IPTUParcelamentoPage = () => {
  const [inscricao, setInscricao] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [aceiteTermos, setAceiteTermos] = useState(false);

  const handleParcelamento = () => {
    if (!inscricao || !cpfCnpj || !parcelas || !aceiteTermos) {
      alert("Por favor, preencha todos os campos e aceite os termos");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://www.araguaina.to.gov.br/servicos/iptu/parcelamento?inscricao=${inscricao}&documento=${cpfCnpj}&parcelas=${parcelas}`, '_blank');
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
              <Calendar className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Parcelamento IPTU
            </h1>
            <p className="text-xl text-muted-foreground">
              Solicite o parcelamento dos seus débitos
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Solicitação de Parcelamento
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
                <Label htmlFor="parcelas">Número de Parcelas</Label>
                <Select value={parcelas} onValueChange={setParcelas}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o número de parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3x (sem juros)</SelectItem>
                    <SelectItem value="6">6x (juros 0,5% a.m.)</SelectItem>
                    <SelectItem value="12">12x (juros 1% a.m.)</SelectItem>
                    <SelectItem value="24">24x (juros 1,5% a.m.)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Condições para parcelamento:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Valor mínimo da parcela: R$ 50,00</li>
                      <li>• Primeira parcela à vista na solicitação</li>
                      <li>• Documento de identidade e CPF obrigatórios</li>
                      <li>• Não pode ter parcelamento em andamento</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="termos" 
                  checked={aceiteTermos}
                  onCheckedChange={(checked) => setAceiteTermos(checked as boolean)}
                />
                <Label htmlFor="termos" className="text-sm">
                  Aceito os termos e condições do parcelamento
                </Label>
              </div>

              <Button 
                onClick={handleParcelamento}
                className="w-full bg-gradient-primary hover:bg-primary/90"
                size="lg"
                disabled={!aceiteTermos}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Solicitar Parcelamento
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default IPTUParcelamentoPage;