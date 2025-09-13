export const SIG_LINKS = {
  IPTU: 'https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-imovel',
  TAXAS: 'https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-contribuinte',
  ALVARA: 'https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-contribuinte',
  CERTIDOES: 'https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-contribuinte',
  PROTOCOLO: 'https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/andamento-processo',
  SERVIDOR: 'https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/portal-servidor',
  AGENDA: 'https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/agenda-atendimento',
} as const;

export function silentRedirect(url: string, params?: Record<string, string>) {
  const u = new URL(url);
  if (params) Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  window.location.replace(u.toString());
}

