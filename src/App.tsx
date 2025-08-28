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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
