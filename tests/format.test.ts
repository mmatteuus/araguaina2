import { describe, expect, it } from 'vitest';
import { formatCurrencyBRL, onlyDigits } from '@/utils/format';

describe('format utilities', () => {
  it('removes non-numeric characters from CPF/CNPJ strings', () => {
    expect(onlyDigits('123.456.789-00')).toBe('12345678900');
    expect(onlyDigits('12.345.678/0001-90')).toBe('12345678000190');
  });

  it('formats currency values in BRL', () => {
    const expected = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1000);
    expect(formatCurrencyBRL(1000)).toBe(expected);
  });
});
