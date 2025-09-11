import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, AlertCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const ISSEmissaoPage = () => {
  const [cnpj, setCnpj] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
  const [competencia, setCompetencia] = useState("");
  const [tipoGuia, setTipoGuia] = useState("");

  const handleEmissao = () => {
    if (!cnpj || !inscricaoMunicipal || !competencia || !tipoGuia) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/emitir-guia-iss?cnpj=${cnpj}&inscricao=${inscricaoMunicipal}&competencia=${competencia}&tipo=${tipoGuia}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/servicos/iss" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para ISS
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Emissão de Guias ISS
            </h1>
            <p className="text-xl text-muted-foreground">
              Gere guias de recolhimento do ISS
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
                <Label htmlFor="competencia">Competência (Mês/Ano)</Label>
                <Select value={competencia} onValueChange={setCompetencia}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a competência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01/2024">Janeiro/2024</SelectItem>
                    <SelectItem value="02/2024">Fevereiro/2024</SelectItem>
                    <SelectItem value="03/2024">Março/2024</SelectItem>
                    <SelectItem value="04/2024">Abril/2024</SelectItem>
                    <SelectItem value="05/2024">Maio/2024</SelectItem>
                    <SelectItem value="06/2024">Junho/2024</SelectItem>
                    <SelectItem value="07/2024">Julho/2024</SelectItem>
                    <SelectItem value="08/2024">Agosto/2024</SelectItem>
                    <SelectItem value="09/2024">Setembro/2024</SelectItem>
                    <SelectItem value="10/2024">Outubro/2024</SelectItem>
                    <SelectItem value="11/2024">Novembro/2024</SelectItem>
                    <SelectItem value="12/2024">Dezembro/2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoGuia">Tipo de Guia</Label>
                <Select value={tipoGuia} onValueChange={setTipoGuia}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de guia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Guia Normal</SelectItem>
                    <SelectItem value="estimativa">Guia por Estimativa</SelectItem>
                    <SelectItem value="substituicao">Substituição Tributária</SelectItem>
                    <SelectItem value="retencao">Retenção na Fonte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Lembre-se:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• O ISS deve ser recolhido até o dia 10 do mês seguinte</li>
                      <li>• Guias vencidas podem ter acréscimos de multa e juros</li>
                      <li>• Mantenha sempre sua inscrição municipal atualizada</li>
                      <li>• Para serviços específicos, consulte a lista de códigos</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleEmissao}
                className="w-full bg-gradient-primary hover:bg-primary/90"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Emitir Guia ISS
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ISSEmissaoPage;