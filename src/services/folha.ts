import { api } from '@/lib/http';

export type ContraChequeItem = {
  descricao: string;
  valor: number;
};

export type ContraChequeDetalhe = {
  matricula: string;
  nome: string;
  lotacao?: string;
  cargo?: string;
  mes: number;
  ano: number;
  proventos: ContraChequeItem[];
  descontos: ContraChequeItem[];
  totalProventos: number;
  totalDescontos: number;
  liquido: number;
};

export type ContraChequeFiltro = {
  matricula: string;
  mes: number;
  ano: number;
};

export async function consultarContraCheque(filtro: ContraChequeFiltro) {
  return api<ContraChequeDetalhe>('/folha/contracheque', { method: 'GET', query: filtro });
}

export async function emitirContraChequePdf(filtro: ContraChequeFiltro) {
  return api<Blob | { url?: string; pdfBase64?: string }>('/folha/contracheque/pdf', { method: 'POST', body: filtro });
}

export async function obterFotoServidor(matricula: string) {
  return api<{ fotoBase64?: string }>('/folha/fotoPessoa', { method: 'GET', query: { matricula } });
}
