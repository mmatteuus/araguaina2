import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calculator, FileText, AlertCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const ISSCalculadoraPage = () => {
  const [valorServico, setValorServico] = useState("");
  const [codigoServico, setCodigoServico] = useState("");
  const [aliquota, setAliquota] = useState("");
  const [valorISS, setValorISS] = useState("");

  const handleCalcular = () => {
    if (!valorServico || !codigoServico) {
      alert("Por favor, preencha o valor do serviço e selecione o código");
      return;
    }
    
    const valor = parseFloat(valorServico.replace(',', '.'));
    const aliq = parseFloat(aliquota) / 100;
    const iss = valor * aliq;
    
    setValorISS(iss.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
  };

  const handleCodigoChange = (codigo: string) => {
    setCodigoServico(codigo);
    // Definir alíquotas baseadas no código do serviço
    switch (codigo) {
      case "01.01":
        setAliquota("5");
        break;
      case "01.02":
        setAliquota("3");
        break;
      case "01.03":
        setAliquota("2");
        break;
      case "01.04":
        setAliquota("4");
        break;
      default:
        setAliquota("5");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Calculator className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Calculadora de ISS
            </h1>
            <p className="text-xl text-muted-foreground">
              Calcule o valor do ISS para seus serviços
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Cálculo do ISS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="valorServico">Valor do Serviço (R$)</Label>
                <Input
                  id="valorServico"
                  placeholder="Digite o valor do serviço"
                  value={valorServico}
                  onChange={(e) => setValorServico(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoServico">Código do Serviço</Label>
                <Select value={codigoServico} onValueChange={handleCodigoChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o código do serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01.01">01.01 - Análise e desenvolvimento de sistemas</SelectItem>
                    <SelectItem value="01.02">01.02 - Programação</SelectItem>
                    <SelectItem value="01.03">01.03 - Processamento de dados</SelectItem>
                    <SelectItem value="01.04">01.04 - Elaboração de programas de computadores</SelectItem>
                    <SelectItem value="02.01">02.01 - Serviços de pesquisas e desenvolvimento</SelectItem>
                    <SelectItem value="03.01">03.01 - Serviços de assessoria ou consultoria</SelectItem>
                    <SelectItem value="04.01">04.01 - Serviços de engenharia</SelectItem>
                    <SelectItem value="05.01">05.01 - Serviços de advocacia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aliquota">Alíquota (%)</Label>
                <Input
                  id="aliquota"
                  value={aliquota}
                  readOnly
                  className="bg-muted"
                />
              </div>

              {valorISS && (
                <div className="space-y-2">
                  <Label>Valor do ISS</Label>
                  <div className="text-2xl font-bold text-primary p-3 bg-primary/10 rounded-lg text-center">
                    {valorISS}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Como funciona o cálculo:</p>
                    <p className="text-xs text-blue-700 mt-1">
                      ISS = Valor do Serviço × Alíquota
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      A alíquota varia conforme o tipo de serviço prestado
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Informações importantes:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Este é apenas um cálculo estimativo</li>
                      <li>• Para valores oficiais, consulte a Secretaria da Fazenda</li>
                      <li>• Algumas atividades podem ter alíquotas diferenciadas</li>
                      <li>• Verifique sempre a legislação municipal vigente</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleCalcular}
                className="w-full bg-gradient-primary hover:bg-primary/90"
                size="lg"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular ISS
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ISSCalculadoraPage;
