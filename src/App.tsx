import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import IPTUPage from "./pages/services/IPTUPage";
import ISSPage from "./pages/services/ISSPage";
import NotaFiscalPage from "./pages/services/NotaFiscalPage";
import ProtocoloPage from "./pages/services/ProtocoloPage";
import LicencaSanitariaPage from "./pages/services/LicencaSanitariaPage";
import AlvaraPage from "./pages/services/AlvaraPage";
import ProcessosPage from "./pages/services/ProcessosPage";
import AgendamentoPage from "./pages/services/AgendamentoPage";
import CertidoesPage from "./pages/services/CertidoesPage";
import TransparenciaPage from "./pages/services/TransparenciaPage";
import OuvidoriaPage from "./pages/services/OuvidoriaPage";
import MapaPage from "./pages/services/MapaPage";
import MEIPage from "./pages/services/MEIPage";
import MultasPage from "./pages/services/MultasPage";
import DiarioOficialPage from "./pages/services/DiarioOficialPage";
import ContraChequePage from "./pages/services/ContraChequePage";
import CreditoEducativoPage from "./pages/services/CreditoEducativoPage";
import CodigoEdificacoesPage from "./pages/services/CodigoEdificacoesPage";
import AgendamentoFazendaPage from "./pages/services/AgendamentoFazendaPage";
import InfracoesTransitoPage from "./pages/services/InfracoesTransitoPage";
import CodigoPosturaPage from "./pages/services/CodigoPosturaPage";
import CreditosTributariosPage from "./pages/services/CreditosTributariosPage";
import DeclaracaoCargosPage from "./pages/services/DeclaracaoCargosPage";
import DeclaracaoBensPage from "./pages/services/DeclaracaoBensPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos/iptu" element={<IPTUPage />} />
          <Route path="/servicos/iss" element={<ISSPage />} />
          <Route path="/servicos/nota-fiscal" element={<NotaFiscalPage />} />
          <Route path="/servicos/protocolo" element={<ProtocoloPage />} />
          <Route path="/servicos/licenca-sanitaria" element={<LicencaSanitariaPage />} />
          <Route path="/servicos/alvara" element={<AlvaraPage />} />
          <Route path="/servicos/processos" element={<ProcessosPage />} />
          <Route path="/servicos/agendamento" element={<AgendamentoPage />} />
          <Route path="/servicos/certidoes" element={<CertidoesPage />} />
        <Route path="/servicos/transparencia" element={<TransparenciaPage />} />
        <Route path="/servicos/ouvidoria" element={<OuvidoriaPage />} />
        <Route path="/servicos/mapa" element={<MapaPage />} />
        <Route path="/servicos/mei" element={<MEIPage />} />
        <Route path="/servicos/multas" element={<MultasPage />} />
        <Route path="/servicos/diario-oficial" element={<DiarioOficialPage />} />
        <Route path="/servicos/contra-cheque" element={<ContraChequePage />} />
        <Route path="/servicos/credito-educativo" element={<CreditoEducativoPage />} />
        <Route path="/servicos/codigo-edificacoes" element={<CodigoEdificacoesPage />} />
        <Route path="/servicos/agendamento-fazenda" element={<AgendamentoFazendaPage />} />
        <Route path="/servicos/infracoes-transito" element={<InfracoesTransitoPage />} />
        <Route path="/servicos/codigo-postura" element={<CodigoPosturaPage />} />
        <Route path="/servicos/creditos-tributarios" element={<CreditosTributariosPage />} />
        <Route path="/servicos/declaracao-cargos" element={<DeclaracaoCargosPage />} />
        <Route path="/servicos/declaracao-bens" element={<DeclaracaoBensPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
