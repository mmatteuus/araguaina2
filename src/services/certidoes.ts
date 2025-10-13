import { api } from '@/lib/http';

export type CertidaoNegativaTipo = 'geral' | 'iptu' | 'iss' | 'taxas' | 'multas';

export type EmitirCertidaoNegativaPayload = {
  cpfCnpj: string;
  nome: string;
  tipoCertidao: CertidaoNegativaTipo;
  inscricaoMunicipal?: string;
};

export type CertidaoResponse = {
  url?: string;
  pdfBase64?: string;
  codigoValidacao?: string;
  validade?: string;
  emitidaEm?: string;
  mensagem?: string;
};

export async function emitirCertidaoNegativa(payload: EmitirCertidaoNegativaPayload) {
  return api<CertidaoResponse | Blob>('/arrecadacao/certidaoNegativa', { method: 'POST', body: payload });
}

export type ValidarCertidaoResponse = {
  valido: boolean;
  tipo?: string;
  cpfCnpj?: string;
  nome?: string;
  emitidaEm?: string;
  validade?: string;
  mensagem?: string;
};

export async function validarCertidao(codigo: string) {
  return api<ValidarCertidaoResponse>('/arrecadacao/certidaoNegativa/validar', { method: 'GET', query: { codigo } });
}
