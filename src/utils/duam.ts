import type { DuamResponse } from '@/types/iptu';

type OpenDuamOptions = {
  target?: string;
};

const decodeBase64 = (input: string) => {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return window.atob(padded);
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(padded, 'base64').toString('binary');
  }
  throw new Error('Decodificador base64 indisponível.');
};

export type DuamOpenResult = {
  url: string;
  linhaDigitavel?: string;
  codigoBarras?: string;
  nossoNumero?: string;
  vencimento?: string;
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
      vencimento: response.vencimento,
    };
  }
  if (response?.pdfBase64) {
    const binary = decodeBase64(response.pdfBase64.includes(',') ? response.pdfBase64.split(',')[1] : response.pdfBase64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, target, 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
    return {
      url,
      linhaDigitavel: response.linhaDigitavel,
      codigoBarras: response.codigoBarras,
      nossoNumero: response.nossoNumero,
      vencimento: response.vencimento,
    };
  }
  throw new Error('Resposta inesperada ao emitir a guia.');
}
