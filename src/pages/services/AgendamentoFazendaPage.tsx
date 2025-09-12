import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowLeft, ExternalLink, Clock, MapPin, Users, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const AgendamentoFazendaPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Serviços
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Calendar className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Agendamento Secretaria da Fazenda
            </h1>
            <p className="text-xl text-muted-foreground">
              Agende atendimento presencial na Secretaria Municipal da Fazenda
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Serviços de Agendamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Agendamento Fazenda</h3>
                    <p className="text-muted-foreground text-sm">Atendimento presencial na Secretaria da Fazenda</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Horários Disponíveis</h3>
                    <p className="text-muted-foreground text-sm">Veja horários disponíveis para agendamento</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Localização</h3>
                    <p className="text-muted-foreground text-sm">Endereço da Secretaria da Fazenda</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Reagendar</h3>
                    <p className="text-muted-foreground text-sm">Altere ou cancele seu agendamento</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Fazer Agendamento</h3>
              <p className="text-muted-foreground mb-4">
                Evite filas e agende seu atendimento na Secretaria da Fazenda
              </p>
              <Button asChild size="lg" className="bg-gradient-primary hover:bg-primary/90">
                <a 
                  href="https://www.araguaina.to.gov.br/servicos/agendamento-secretaria-da-fazenda" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <span>Agendar Atendimento</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoFazendaPage;
