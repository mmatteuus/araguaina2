export type Servico = {
  label: string;
  slug: string;
  url: string;
  aliases?: string[];
};

export const SERVICOS: Servico[] = [
  {
    label: "Agendamento para Atendimento Presencial na Secretaria Municipal da Fazenda",
    slug: "agenda-atendimento",
    url: "https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/agenda-atendimento",
    aliases: ["agenda"]
  },
  {
    label: "Código de Edificações do Município",
    slug: "codigo-de-edificacoes",
    url: "https://araguaina.to.gov.br/secretarias/secretaria-municipal-da-infraestrutura",
    aliases: ["codigo-edificacoes"]
  },
  {
    label: "Consulta Créditos Tributarios",
    slug: "consulta-creditos-tributarios",
    url: "https://araguainato.webiss.com.br/",
    aliases: ["creditos", "tributos"]
  },
  {
    label: "Consultar andamento de processos",
    slug: "andamento-processo",
    url: "https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/andamento-processo/",
    aliases: ["andamento", "protocolo"]
  },
  {
    label: "Consultar Multas",
    slug: "multas-transito",
    url: "https://araguaina.to.gov.br/secretarias/agencia-municipal-de-seguranca-transporte-e-transito",
    aliases: ["multas"]
  },
  {
    label: "Consultar online suas infrações de trânsito",
    slug: "infracoes-transito",
    url: "https://portalservicos.senatran.serpro.gov.br/#/home",
    aliases: ["infracoes"]
  },
  {
    label: "Diário oficial do Município de Araguaína",
    slug: "diario-oficial",
    url: "https://diariooficial.araguaina.to.gov.br/diario-oficial",
    aliases: ["diario"]
  },
  {
    label: "Emitir Certidão Negativa de Contribuinte",
    slug: "cnd-contribuinte",
    url: "https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-contribuinte",
    aliases: ["cnd"]
  },
  {
    label: "Emitir Guias do IPTU",
    slug: "iptu",
    url: "https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-imovel",
    aliases: ["iptu"]
  },
  {
    label: "Emitir Taxa de Coleta de Lixo",
    slug: "taxa-coleta-lixo",
    url: "https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/debito-contribuinte",
    aliases: ["lixo", "taxa-lixo"]
  },
  {
    label: "Leis, decretos e Portarias",
    slug: "leis-decretos-portarias",
    url: "https://leis.araguaina.to.gov.br/",
    aliases: ["leis"]
  },
  {
    label: "Medidores de velocidade - Estudo técnico",
    slug: "medidores-velocidade-estudo",
    url: "https://araguaina.to.gov.br/secretarias/agencia-municipal-de-seguranca-transporte-e-transito",
    aliases: ["medidores"]
  },
  {
    label: "Medidores de velocidade - Lista de Endereços",
    slug: "medidores-velocidade-enderecos",
    url: "https://araguaina.to.gov.br/secretarias/agencia-municipal-de-seguranca-transporte-e-transito",
    aliases: ["medidores-enderecos"]
  },
  {
    label: "Plano de Arborização Urbana de Araguaína",
    slug: "plano-arborizacao",
    url: "https://drive.google.com/file/d/11_w9vsn5vVlJgfMPskf8sxSS4r9rmXin/view",
    aliases: ["arborizacao"]
  },
  {
    label: "Plano de Gestão Integrada de Resíduos Sólidos",
    slug: "pmgirs",
    url: "https://araguaina.to.gov.br/plano-municipal-de-gestao-integrada-de-residuos-solidos.pdf",
    aliases: ["residuos"]
  },
  {
    label: "Portal de Transparência",
    slug: "portal-transparencia",
    url: "https://transparencia.araguaina.to.gov.br/transparencia",
    aliases: ["transparencia"]
  },
  {
    label: "Renovação do Crédito Educativo",
    slug: "renovacao-credito-educativo",
    url: "https://araguaina.1doc.com.br/b.php?pg=wp/wp&s=araguaina&itd=18&is=4829210",
    aliases: ["credito-educativo", "renovacao-credito"]
  },
  {
    label: "Requerimento desconto IPTU",
    slug: "requerimento-desconto-iptu",
    url: "https://araguaina.to.gov.br/secretarias/secretaria-municipal-da-fazenda-tecnologia-ciencia-e-inovacao",
    aliases: ["desconto-iptu"]
  },
  {
    label: "Sistema de Informações Geográficas de Araguaína",
    slug: "siga",
    url: "https://siga.araguaina.to.gov.br/araguaina/",
    aliases: ["siga"]
  },
  {
    label: "Sistema Eletrônico de Protocolo",
    slug: "protocolo-eletronico",
    url: "https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/andamento-processo/",
    aliases: ["protocolo-eletronico"]
  },
  {
    label: "Validar Certidão Negativa Débitos",
    slug: "validar-cnd",
    url: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte",
    aliases: ["validar-cnd"]
  },
  {
    label: "Valores de Terra Nua (VTN)",
    slug: "vtn",
    url: "https://araguaina.to.gov.br/vtn-municipal-de-araguaina",
    aliases: ["vtn"]
  }
];

