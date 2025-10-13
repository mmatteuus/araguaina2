export const formatCurrencyBRL = (value: number | null | undefined) => {
  if (value == null || Number.isNaN(value)) return 'R$ 0,00';
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export const formatCpfCnpj = (value: string | null | undefined) => {
  if (!value) return '';
  const digits = onlyDigits(value);
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  if (digits.length === 14) {
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return value;
};

export const formatInscricao = (value: string | null | undefined) => {
  if (!value) return '';
  const cleaned = value.trim();
  if (!cleaned) return '';
  return cleaned.toUpperCase();
};

export const sumValues = (values: Array<number | null | undefined>) =>
  values.reduce((total, current) => total + (typeof current === 'number' && !Number.isNaN(current) ? current : 0), 0);
