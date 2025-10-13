import type { DuamResponse } from '@/types/iptu';

type OpenDuamOptions = {
  fileName?: string;
  target?: string;
};

const toBlobFromBase64 = (base64: string) => {
  const cleaned = base64.includes(',') ? base64.split(',')[1] : base64;
  const decode =
    typeof window !== 'undefined' && typeof window.atob === 'function'
      ? window.atob
      : (input: string) => {
          if (typeof Buffer !== 'undefined') {
            return Buffer.from(input, 'base64').toString('binary');
          }
          throw new Error('Base64 decoder indisponível.');
        };
  const binary = decode(cleaned);
  const len = binary.length;
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) buffer[i] = binary.charCodeAt(i);
  return new Blob([buffer], { type: 'application/pdf' });
};

export type DuamOpenResult = {
  url: string;
  linhaDigitavel?: string;
  codigoBarras?: string;
  nossoNumero?: string;
  venceEm?: string;
};

export function openDuamResponse(response: DuamResponse | Blob, options: OpenDuamOptions = {}): DuamOpenResult {
  const target = options.target ?? '_blank';
  if (response instanceof Blob) {
    const url = URL.createObjectURL(response);
    window.open(url, target, 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return { url };
  }
  if (response?.url) {
    window.open(response.url, target, 'noopener,noreferrer');
    return {
      url: response.url,
      linhaDigitavel: response.linhaDigitavel,
      codigoBarras: response.codigoBarras,
      nossoNumero: response.nossoNumero,
      venceEm: response.vencimento,
    };
  }
  if (response?.pdfBase64) {
    const blob = toBlobFromBase64(response.pdfBase64);
    const url = URL.createObjectURL(blob);
    window.open(url, target, 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return {
      url,
      linhaDigitavel: response.linhaDigitavel,
      codigoBarras: response.codigoBarras,
      nossoNumero: response.nossoNumero,
      venceEm: response.vencimento,
    };
  }
  throw new Error('Resposta inesperada da emissão de DUAM.');
}
