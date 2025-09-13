import { api } from '@/lib/http';
import type { SimulacaoRepactuacaoItem, Debito } from '@/types/iptu';

export type SimulacaoRepactuacaoInput = {
  cpfCnpj?: string;
  inscricaoImobiliaria?: string;
  quantidadeParcelas: number;
  debitosSelecionados?: Array<{ ano: number; parcela?: number; tipo?: string; id?: string }>;
};

export async function simulacaoRepactuacao(payload: SimulacaoRepactuacaoInput) {
  return api<SimulacaoRepactuacaoItem[]>('/arrecadacao/simulacaoRepactuacao', { method: 'POST', body: payload });
}

export type EfetivarRepactuacaoInput = { codigoSimulacao: number; cpfCnpj?: string; inscricaoImobiliaria?: string };
export type EfetivarRepactuacaoResult = { protocolo: string; parcelasGeradas: number };

export async function efetivarRepactuacao(payload: EfetivarRepactuacaoInput) {
  return api<EfetivarRepactuacaoResult>('/arrecadacao/efetivarRepactuacao', { method: 'POST', body: payload });
}

export type EmitirBoletosInput = { protocolo: string };
export type BoletoLink = { parcela: number; url: string };

export async function emitirBoletos(payload: EmitirBoletosInput) {
  return api<BoletoLink[]>('/arrecadacao/emitirBoletos', { method: 'POST', body: payload });
}

export async function consultarDebitos(cpfCnpj?: string, inscricaoImobiliaria?: string) {
  const q: Record<string, string> = {};
  if ((cpfCnpj || '').trim()) q.cpfCnpj = String(cpfCnpj).trim();
  if ((inscricaoImobiliaria || '').trim()) q.inscricao = String(inscricaoImobiliaria).trim();
  return api<Debito[]>('/arrecadacao/debitos', { method: 'GET', query: q });
}
