import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, FileText, AlertCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const NotaFiscalConsultaPage = () => {
  const [cnpj, setCnpj] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
  const [numeroNota, setNumeroNota] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const handleConsulta = () => {
    if (!cnpj || !inscricaoMunicipal || !tipoConsulta) {
      alert("Por favor, preencha os campos obrigatórios");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/consultar-nfse`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/servicos/nota-fiscal" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Nota Fiscal
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Consulta de Notas Fiscais
            </h1>
            <p className="text-xl text-muted-foreground">
              Consulte suas NFSe emitidas e recebidas
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
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ da Empresa *</Label>
                  <Input
                    id="cnpj"
                    placeholder="Digite o CNPJ"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inscricaoMunicipal">Inscrição Municipal *</Label>
                  <Input
                    id="inscricaoMunicipal"
                    placeholder="Digite a inscrição municipal"
                    value={inscricaoMunicipal}
                    onChange={(e) => setInscricaoMunicipal(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoConsulta">Tipo de Consulta *</Label>
                <Select value={tipoConsulta} onValueChange={setTipoConsulta}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emitidas">Notas Emitidas</SelectItem>
                    <SelectItem value="recebidas">Notas Recebidas</SelectItem>
                    <SelectItem value="numero">Consulta por Número</SelectItem>
                    <SelectItem value="periodo">Consulta por Período</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoConsulta === "numero" && (
                <div className="space-y-2">
                  <Label htmlFor="numeroNota">Número da Nota Fiscal</Label>
                  <Input
                    id="numeroNota"
                    placeholder="Digite o número da NFSe"
                    value={numeroNota}
                    onChange={(e) => setNumeroNota(e.target.value)}
                  />
                </div>
              )}

              {tipoConsulta === "periodo" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data Início</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dataFim">Data Fim</Label>
                    <Input
                      id="dataFim"
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Informações sobre a consulta:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Consulte notas emitidas nos últimos 5 anos</li>
                      <li>• É possível reimprimir DANFSe</li>
                      <li>• Notas canceladas aparecem com status específico</li>
                      <li>• Para dúvidas, entre em contato com a Secretaria da Fazenda</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Dica:</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Para consultas por período, selecione um intervalo máximo de 3 meses para melhor performance
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleConsulta}
                className="w-full bg-gradient-primary hover:bg-primary/90"
                size="lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Consultar Notas Fiscais
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default NotaFiscalConsultaPage;