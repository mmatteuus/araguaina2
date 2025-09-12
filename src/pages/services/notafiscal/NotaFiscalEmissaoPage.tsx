import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, AlertCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const NotaFiscalEmissaoPage = () => {
  const [cnpjPrestador, setCnpjPrestador] = useState("");
  const [inscricaoMunicipal, setInscricaoMunicipal] = useState("");
  const [cpfTomador, setCpfTomador] = useState("");
  const [nomeTomador, setNomeTomador] = useState("");
  const [enderecoTomador, setEnderecoTomador] = useState("");
  const [codigoServico, setCodigoServico] = useState("");
  const [discriminacao, setDiscriminacao] = useState("");
  const [valorServico, setValorServico] = useState("");

  const handleEmissao = () => {
    if (!cnpjPrestador || !inscricaoMunicipal || !cpfTomador || !nomeTomador || !codigoServico || !valorServico) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    
    // Redirecionar para o sistema oficial da prefeitura
    window.open(`https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/emitir-nfse`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FileText className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Emissão de Nota Fiscal Eletrônica
            </h1>
            <p className="text-xl text-muted-foreground">
              Emita NFSe para seus serviços prestados
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Dados do Prestador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpjPrestador">CNPJ do Prestador *</Label>
                  <Input
                    id="cnpjPrestador"
                    placeholder="Digite o CNPJ"
                    value={cnpjPrestador}
                    onChange={(e) => setCnpjPrestador(e.target.value)}
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Dados do Tomador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cpfTomador">CPF/CNPJ do Tomador *</Label>
                  <Input
                    id="cpfTomador"
                    placeholder="Digite CPF ou CNPJ"
                    value={cpfTomador}
                    onChange={(e) => setCpfTomador(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nomeTomador">Nome/Razão Social *</Label>
                  <Input
                    id="nomeTomador"
                    placeholder="Nome completo ou razão social"
                    value={nomeTomador}
                    onChange={(e) => setNomeTomador(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="enderecoTomador">Endereço</Label>
                  <Input
                    id="enderecoTomador"
                    placeholder="Endereço completo"
                    value={enderecoTomador}
                    onChange={(e) => setEnderecoTomador(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Dados do Serviço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="codigoServico">Código do Serviço *</Label>
                  <Select value={codigoServico} onValueChange={setCodigoServico}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o código" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01.01">01.01 - Análise e desenvolvimento de sistemas</SelectItem>
                      <SelectItem value="01.02">01.02 - Programação</SelectItem>
                      <SelectItem value="01.03">01.03 - Processamento de dados</SelectItem>
                      <SelectItem value="02.01">02.01 - Serviços de pesquisas</SelectItem>
                      <SelectItem value="03.01">03.01 - Assessoria ou consultoria</SelectItem>
                      <SelectItem value="04.01">04.01 - Serviços de engenharia</SelectItem>
                      <SelectItem value="05.01">05.01 - Serviços de advocacia</SelectItem>
                      <SelectItem value="07.01">07.01 - Serviços de limpeza</SelectItem>
                      <SelectItem value="17.01">17.01 - Serviços de apoio administrativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valorServico">Valor do Serviço (R$) *</Label>
                  <Input
                    id="valorServico"
                    placeholder="0,00"
                    value={valorServico}
                    onChange={(e) => setValorServico(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discriminacao">Discriminação do Serviço</Label>
                <Textarea
                  id="discriminacao"
                  placeholder="Descreva detalhadamente o serviço prestado"
                  value={discriminacao}
                  onChange={(e) => setDiscriminacao(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <p className="text-sm font-medium">Antes de emitir:</p>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li>• Verifique se todos os dados estão corretos</li>
                      <li>• A NFSe não pode ser cancelada após emissão</li>
                      <li>• Mantenha o certificado digital atualizado</li>
                      <li>• O valor mínimo para emissão é R$ 1,00</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleEmissao}
                variant="primaryGradient" className="w-full"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Emitir Nota Fiscal Eletrônica
              </Button>
            </CardContent>
          </Card>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default NotaFiscalEmissaoPage;


