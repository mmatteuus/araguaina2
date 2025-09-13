import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from '@/pages/Index';
import BuscarPage from '@/pages/Buscar';
import CategoriasPage from '@/pages/Categorias';
import ServicoDetalhePage from '@/pages/ServicoDetalhe';
import IPTUParcelamentoPage from '@/pages/Servicos/IPTUParcelamentoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/buscar" element={<BuscarPage />} />
        <Route path="/categorias" element={<CategoriasPage />} />
        <Route path="/servico/:slug" element={<ServicoDetalhePage />} />
        <Route path="/servicos/iptu" element={<IPTUParcelamentoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

