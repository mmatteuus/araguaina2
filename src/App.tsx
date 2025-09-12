import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Categorias from "./pages/Categorias";
import CategoriasLista from "./pages/CategoriasLista";
import ServicoDetalhe from "./pages/ServicoDetalhe";
import NotFound from "./pages/NotFound";
import IPTUPage from "./pages/services/IPTUPage";
import IPTUConsultaPage from "./pages/services/iptu/IPTUConsultaPage";
import IPTUEmissaoPage from "./pages/services/iptu/IPTUEmissaoPage";
import IPTUParcelamentoPage from "./pages/services/iptu/IPTUParcelamentoPage";
import ISSConsultaPage from "./pages/services/iss/ISSConsultaPage";
import ISSEmissaoPage from "./pages/services/iss/ISSEmissaoPage";
import ISSCalculadoraPage from "./pages/services/iss/ISSCalculadoraPage";
import NotaFiscalEmissaoPage from "./pages/services/notafiscal/NotaFiscalEmissaoPage";
import NotaFiscalConsultaPage from "./pages/services/notafiscal/NotaFiscalConsultaPage";
import MultasConsultaPage from "./pages/services/multas/MultasConsultaPage";
import CertidaoNegativaPage from "./pages/services/certidoes/CertidaoNegativaPage";
import ProtocoloConsultaPage from "./pages/services/protocolo/ProtocoloConsultaPage";
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
import TaxaLixoPage from "./pages/services/TaxaLixoPage";
import LicenciamentoAmbientalPage from "./pages/services/LicenciamentoAmbientalPage";
import ConsignacoesPage from "./pages/services/ConsignacoesPage";
import DATPage from "./pages/services/DATPage";
import CCMEIPage from "./pages/services/CCMEIPage";
import FICPage from "./pages/services/FICPage";
import FormulariosCreditoPage from "./pages/services/FormulariosCreditoPage";
import ArborizacaoPage from "./pages/services/ArborizacaoPage";
import PMAEPage from "./pages/services/PMAEPage";
import GestaoResiduosPage from "./pages/services/GestaoResiduosPage";
import LeisDecretosPage from "./pages/services/LeisDecretosPage";
import MedidoresEstudoPage from "./pages/services/MedidoresEstudoPage";
import MedidoresEnderecosPage from "./pages/services/MedidoresEnderecosPage";
import ValidarNFSePage from "./pages/services/ValidarNFSePage";
import NFSEPage from "./pages/services/NFSEPage";
import GuiaAlvaraPage from "./pages/services/GuiaAlvaraPage";
import DispensaVistoriaBombeirosPage from "./pages/services/DispensaVistoriaBombeirosPage";
import AtualizarMEIPage from "./pages/services/AtualizarMEIPage";
import BaixaMEIPage from "./pages/services/BaixaMEIPage";
import ContraChequeIMPARPage from "./pages/services/ContraChequeIMPARPage";
import JuntaMedicaPage from "./pages/services/JuntaMedicaPage";
import LicencaPremioPage from "./pages/services/LicencaPremioPage";
import LicencaFeriasPage from "./pages/services/LicencaFeriasPage";
import RequerimentosDiversosPage from "./pages/services/RequerimentosDiversosPage";
import LicencaAperfeicoamentoPage from "./pages/services/LicencaAperfeicoamentoPage";
import ProtocoloServidorPage from "./pages/services/ProtocoloServidorPage";
import VTNPage from "./pages/services/VTNPage";
import SIGPage from "./pages/services/SIGPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/categorias" replace />} />
              <Route path="/servicos/iptu" element={<IPTUPage />} />
              <Route path="/servicos/iptu/consulta" element={<IPTUConsultaPage />} />
              <Route path="/servicos/iptu/emissao" element={<IPTUEmissaoPage />} />
              <Route path="/servicos/iptu/parcelamento" element={<IPTUParcelamentoPage />} />
              <Route path="/servicos/iss" element={<ISSPage />} />
              <Route path="/servicos/iss/consulta" element={<ISSConsultaPage />} />
              <Route path="/servicos/iss/emissao" element={<ISSEmissaoPage />} />
              <Route path="/servicos/iss/calculadora" element={<ISSCalculadoraPage />} />
              <Route path="/servicos/nota-fiscal" element={<NotaFiscalPage />} />
              <Route path="/servicos/nota-fiscal/emissao" element={<NotaFiscalEmissaoPage />} />
              <Route path="/servicos/nota-fiscal/consulta" element={<NotaFiscalConsultaPage />} />
              <Route path="/servicos/multas" element={<MultasPage />} />
              <Route path="/servicos/multas/consulta" element={<MultasConsultaPage />} />
              <Route path="/servicos/certidoes" element={<CertidoesPage />} />
              <Route path="/servicos/certidoes/negativa" element={<CertidaoNegativaPage />} />
              <Route path="/servicos/protocolo" element={<ProtocoloPage />} />
              <Route path="/servicos/protocolo/consulta" element={<ProtocoloConsultaPage />} />
              <Route path="/servicos/licenca-sanitaria" element={<LicencaSanitariaPage />} />
              <Route path="/servicos/alvara" element={<AlvaraPage />} />
              <Route path="/servicos/processos" element={<ProcessosPage />} />
              <Route path="/servicos/agendamento" element={<AgendamentoPage />} />
              <Route path="/servicos/transparencia" element={<TransparenciaPage />} />
              <Route path="/servicos/ouvidoria" element={<OuvidoriaPage />} />
              <Route path="/servicos/mapa" element={<MapaPage />} />
              <Route path="/servicos/mei" element={<MEIPage />} />
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
              <Route path="/servicos/taxa-lixo" element={<TaxaLixoPage />} />
              <Route path="/servicos/licenciamento-ambiental" element={<LicenciamentoAmbientalPage />} />
              <Route path="/servicos/consignacoes" element={<ConsignacoesPage />} />
              <Route path="/servicos/dat" element={<DATPage />} />
              <Route path="/servicos/ccmei" element={<CCMEIPage />} />
              <Route path="/servicos/fic" element={<FICPage />} />
              <Route path="/servicos/formularios-credito" element={<FormulariosCreditoPage />} />
              <Route path="/servicos/arborizacao" element={<ArborizacaoPage />} />
              <Route path="/servicos/pmae" element={<PMAEPage />} />
              <Route path="/servicos/gestao-residuos" element={<GestaoResiduosPage />} />
              <Route path="/servicos/leis-decretos" element={<LeisDecretosPage />} />
              <Route path="/servicos/medidores-estudo" element={<MedidoresEstudoPage />} />
              <Route path="/servicos/medidores-enderecos" element={<MedidoresEnderecosPage />} />
              <Route path="/servicos/validar-nfs-e" element={<ValidarNFSePage />} />
              <Route path="/servicos/nfs-e" element={<NFSEPage />} />
              <Route path="/servicos/guia-alvara" element={<GuiaAlvaraPage />} />
              <Route path="/servicos/dispensa-vistoria-bombeiros" element={<DispensaVistoriaBombeirosPage />} />
              <Route path="/servicos/atualizar-mei" element={<AtualizarMEIPage />} />
              <Route path="/servicos/baixa-mei" element={<BaixaMEIPage />} />
            <Route path="/servicos/contra-cheque-impar" element={<ContraChequeIMPARPage />} />
            <Route path="/servicos/junta-medica" element={<JuntaMedicaPage />} />
            <Route path="/servicos/licenca-premio" element={<LicencaPremioPage />} />
            <Route path="/servicos/licenca-ferias" element={<LicencaFeriasPage />} />
            <Route path="/servicos/requerimentos-diversos" element={<RequerimentosDiversosPage />} />
            <Route path="/servicos/licenca-aperfeicoamento" element={<LicencaAperfeicoamentoPage />} />
            <Route path="/servicos/protocolo-servidor" element={<ProtocoloServidorPage />} />
            <Route path="/servicos/vtn" element={<VTNPage />} />
              <Route path="/servicos/sig" element={<SIGPage />} />
              {/* Rotas dinâmicas de catálogo */}
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/:categoria" element={<CategoriasLista />} />
              <Route path="/servicos/:slug" element={<ServicoDetalhe />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
