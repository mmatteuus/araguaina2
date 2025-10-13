export type SimulacaoRepactuacaoItem = {
  codigoSimulacao: number;
  parcela: number;
  valorAmortizacao: number;
  valorCorrecao: number;
  valorDesconto: number;
  valorDivida: number;
  valorExpediente: number;
  valorJuros: number;
  valorJurosParcelamento: number;
  valorMulta: number;
  valorOriginal: number;
  valorOutrasReceitas: number;
  valorPrecoJuros: number;
  valorReceitaAdicional: number;
  valorSaldo: number;
  valorSaldoDevedor: number;
  vencimento: string;
};

export type Debito = {
  id: string;
  ano: number;
  descricao: string;
  valor: number;
  selecionavel: boolean;
  parcela?: number;
  tipo?: string;
  inscricao?: string;
  inscricaoImobiliaria?: string;
  valorAtualizado?: number;
  situacao?: string;
  linhaDigitavel?: string;
  codigoBarras?: string;
};

export type DuamResponse = {
  url?: string;
  pdfBase64?: string;
  linhaDigitavel?: string;
  codigoBarras?: string;
  nossoNumero?: string;
  vencimento?: string;
};

