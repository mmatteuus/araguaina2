import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, FileText, AlertCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const ProtocoloConsultaPage = () => {
  const [numeroProtocolo, setNumeroProtocolo] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [tipoProcesso, setTipoProcesso] = useState("");
  const [anoProcesso, setAnoProcesso] = useState("");

  const handleConsulta = () => {
    if (!numeroProtocolo && !cpfCnpj) {
      alert("Por favor, informe o número do protocolo ou CPF/CNPJ");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/andamento-processo/`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Consulta de Processos
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe o andamento dos seus processos
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
                <Label htmlFor="numeroProtocolo">Número do Protocolo</Label>
                <Input
                  id="numeroProtocolo"
                  placeholder="Digite o número do protocolo"
                  value={numeroProtocolo}
                  onChange={(e) => setNumeroProtocolo(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex-1 border-t border-border"></div>
                <span>OU</span>
                <div className="flex-1 border-t border-border"></div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ do Requerente</Label>
                <Input
                  id="cpfCnpj"
                  placeholder="Digite CPF ou CNPJ"
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipoProcesso">Tipo de Processo</Label>
                  <Select value={tipoProcesso} onValueChange={setTipoProcesso}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alvara">Alvará de Funcionamento</SelectItem>
                      <SelectItem value="licenca">Licença Sanitária</SelectItem>
                      <SelectItem value="certidao">Certidões</SelectItem>
                      <SelectItem value="isencao">Isenção de Impostos</SelectItem>
                      <SelectItem value="parcelamento">Parcelamento</SelectItem>
                      <SelectItem value="recurso">Recurso/Defesa</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anoProcesso">Ano do Processo</Label>
                  <Select value={anoProcesso} onValueChange={setAnoProcesso}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Status dos processos:</p>
                    <ul className="text-xs text-blue-700 mt-2 space-y-1">
                      <li>• <strong>Protocolado:</strong> Processo recebido e aguardando análise</li>
                      <li>• <strong>Em análise:</strong> Sendo avaliado pelo setor competente</li>
                      <li>• <strong>Pendente:</strong> Aguardando documentos ou informações</li>
                      <li>• <strong>Deferido:</strong> Processo aprovado</li>
                      <li>• <strong>Indeferido:</strong> Processo negado</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Informações importantes:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Processos são atualizados em tempo real</li>
                      <li>• Guarde sempre o número do protocolo</li>
                      <li>• Para dúvidas, entre em contato com o setor responsável</li>
                      <li>• Alguns processos podem exigir comparecimento pessoal</li>
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
                Consultar Processo
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProtocoloConsultaPage;
