export interface Service {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

export const services: Service[] = [
  {
    id: "1",
    title: "IPTU - Consulta e Emissão de Guias",
    description: "Consulte débitos, emita guias de pagamento e acompanhe sua situação fiscal do IPTU.",
    url: "https://servicos.araguaina.to.gov.br/iptu",
    category: "tributos"
  },
  {
    id: "2",
    title: "ISS - Imposto Sobre Serviços",
    description: "Consulte e emita guias de ISS, faça declarações e acompanhe sua situação tributária.",
    url: "https://servicos.araguaina.to.gov.br/iss",
    category: "tributos"
  },
  {
    id: "3",
    title: "Nota Fiscal Eletrônica",
    description: "Emita e consulte notas fiscais eletrônicas de serviços prestados no município.",
    url: "https://nfse.araguaina.to.gov.br",
    category: "tributos"
  },
  {
    id: "4",
    title: "Protocolo Digital",
    description: "Abra protocolos, acompanhe processos e consulte o andamento de suas solicitações.",
    url: "https://protocolo.araguaina.to.gov.br",
    category: "cidadao"
  },
  {
    id: "5",
    title: "Licença Sanitária",
    description: "Solicite licenças sanitárias para estabelecimentos comerciais e industriais.",
    url: "https://servicos.araguaina.to.gov.br/licenca-sanitaria",
    category: "cidadao"
  },
  {
    id: "6",
    title: "Alvará de Funcionamento",
    description: "Solicite alvará de funcionamento para seu estabelecimento comercial.",
    url: "https://servicos.araguaina.to.gov.br/alvara",
    category: "cidadao"
  },
  {
    id: "7",
    title: "Consulta de Processos",
    description: "Consulte o andamento de processos administrativos na prefeitura.",
    url: "https://processos.araguaina.to.gov.br",
    category: "documentos"
  },
  {
    id: "8",
    title: "Agendamento de Atendimento",
    description: "Agende horário para atendimento presencial nos órgãos municipais.",
    url: "https://agendamento.araguaina.to.gov.br",
    category: "eventos"
  },
  {
    id: "9",
    title: "Certidões Negativas",
    description: "Emita certidões negativas de débitos municipais de forma digital.",
    url: "https://certidoes.araguaina.to.gov.br",
    category: "documentos"
  },
  {
    id: "10",
    title: "Portal da Transparência",
    description: "Consulte informações sobre gastos públicos, licitações e contratos.",
    url: "https://transparencia.araguaina.to.gov.br",
    category: "cidadao"
  },
  {
    id: "11",
    title: "Ouvidoria Municipal",
    description: "Registre sugestões, reclamações e elogios sobre os serviços municipais.",
    url: "https://ouvidoria.araguaina.to.gov.br",
    category: "cidadao"
  },
  {
    id: "12",
    title: "Mapa da Cidade",
    description: "Consulte mapas interativos, localização de órgãos e serviços públicos.",
    url: "https://mapa.araguaina.to.gov.br",
    category: "localizacao"
  }
];