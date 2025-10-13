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
};

