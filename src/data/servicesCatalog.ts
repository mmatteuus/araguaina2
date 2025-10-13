export interface ServiceDetail {
  id: string;
  nome: string;
  pagina: string;
  link: string;
  origem?: string;
  publico: string[];
  secretaria?: string;
  categoria: string;
  descricao: string;
  icon: string;
  gratuito: boolean;
  requerLogin: boolean;
  subServicos?: ServiceDetail[];
}

export interface ServiceCategory {
  name: string;
  services: string[];
}

export interface ServiceCatalog {
  servicos: ServiceDetail[];
  categorias: {
    [key: string]: string[];
  };
  linksGenericos: {
    [key: string]: string;
  };
}

export const servicesCatalog: ServiceCatalog = {
  servicos: [
    // Serviços Tributários
    {
      id: "1",
      nome: "IPTU - Imposto Predial e Territorial Urbano",
      pagina: "iptu",
      link: "/servicos/iptu",
      publico: ["Cidadãos", "Empresas"],
      secretaria: "Fazenda",
      categoria: "Tributário",
      descricao: "Consulta, emissão e parcelamento de guias de IPTU",
      icon: "CreditCard",
      gratuito: true,
      requerLogin: false,
      subServicos: [
        {
          id: "1-1",
          nome: "Consulta de IPTU",
          pagina: "iptu-consulta",
          link: "/servicos/iptu/consulta",
          origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte",
          publico: ["Cidadãos", "Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Consultar débitos e situação do IPTU",
          icon: "Search",
          gratuito: true,
          requerLogin: true
        },
        {
          id: "1-2",
          nome: "Emissão de Guias IPTU",
          pagina: "iptu-emissao",
          link: "/servicos/iptu/emissao",
          origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte",
          publico: ["Cidadãos", "Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Emitir guias para pagamento do IPTU",
          icon: "FileText",
          gratuito: true,
          requerLogin: true
        },
        {
          id: "1-3",
          nome: "Parcelamento IPTU",
          pagina: "iptu-parcelamento",
          link: "/servicos/iptu/parcelamento",
          origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte",
          publico: ["Cidadãos", "Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Parcelar débitos do IPTU",
          icon: "Calculator",
          gratuito: true,
          requerLogin: true
        }
      ]
    },
    {
      id: "2",
      nome: "ISS - Imposto sobre Serviços",
      pagina: "iss",
      link: "/servicos/iss",
      publico: ["Empresas"],
      secretaria: "Fazenda",
      categoria: "Tributário",
      descricao: "Consulta, emissão e cálculo do ISS",
      icon: "Building",
      gratuito: true,
      requerLogin: false,
      subServicos: [
        {
          id: "2-1",
          nome: "Consulta ISS",
          pagina: "iss-consulta",
          link: "/servicos/iss/consulta",
          origem: "https://araguainato.webiss.com.br/",
          publico: ["Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Consultar débitos e situação do ISS",
          icon: "Search",
          gratuito: true,
          requerLogin: true
        },
        {
          id: "2-2",
          nome: "Emissão ISS",
          pagina: "iss-emissao",
          link: "/servicos/iss/emissao",
          origem: "https://araguainato.webiss.com.br/",
          publico: ["Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Emitir guias para pagamento do ISS",
          icon: "FileText",
          gratuito: true,
          requerLogin: true
        },
        {
          id: "2-3",
          nome: "Calculadora ISS",
          pagina: "iss-calculadora",
          link: "/servicos/iss/calculadora",
          origem: "https://araguainato.webiss.com.br/",
          publico: ["Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Calcular valor do ISS",
          icon: "Calculator",
          gratuito: true,
          requerLogin: false
        }
      ]
    },
    {
      id: "3",
      nome: "Nota Fiscal Eletrônica",
      pagina: "nota-fiscal",
      link: "/servicos/nota-fiscal",
      origem: "https://araguainato.webiss.com.br/",
      publico: ["Empresas"],
      secretaria: "Fazenda",
      categoria: "Tributário",
      descricao: "Emissão e consulta de NFSe",
      icon: "FileText",
      gratuito: true,
      requerLogin: false,
      subServicos: [
        {
          id: "3-1",
          nome: "Emissão NFSe",
          pagina: "nota-fiscal-emissao",
          link: "/servicos/nota-fiscal/emissao",
          origem: "https://araguainato.webiss.com.br/",
          publico: ["Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Emitir Nota Fiscal de Serviço Eletrônica",
          icon: "Plus",
          gratuito: true,
          requerLogin: true
        },
        {
          id: "3-2",
          nome: "Consulta NFSe",
          pagina: "nota-fiscal-consulta",
          link: "/servicos/nota-fiscal/consulta",
          origem: "https://araguainato.webiss.com.br/",
          publico: ["Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Consultar Notas Fiscais emitidas",
          icon: "Search",
          gratuito: true,
          requerLogin: true
        }
      ]
    },
    {
      id: "4",
      nome: "Protocolo Digital",
      pagina: "protocolo",
      link: "/servicos/protocolo",
      publico: ["Cidadãos", "Empresas"],
      secretaria: "Administração",
      categoria: "Protocolo",
      descricao: "Abertura e consulta de protocolos",
      icon: "Users",
      gratuito: true,
      requerLogin: false,
      subServicos: [
        {
          id: "4-1",
          nome: "Consulta de Processos",
          pagina: "protocolo-consulta",
          link: "/servicos/protocolo/consulta",
          origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/andamento-processo/",
          publico: ["Cidadãos", "Empresas"],
          secretaria: "Administração",
          categoria: "Protocolo",
          descricao: "Consultar andamento de processos",
          icon: "Search",
          gratuito: true,
          requerLogin: false
        }
      ]
    },
    {
      id: "5",
      nome: "Licença Sanitária",
      pagina: "licenca-sanitaria",
      link: "/servicos/licenca-sanitaria",
      publico: ["Empresas"],
      secretaria: "Saúde",
      categoria: "Licenças",
      descricao: "Licenças para estabelecimentos",
      icon: "Shield",
      gratuito: false,
      requerLogin: true
    },
    {
      id: "6",
      nome: "Alvará de Funcionamento",
      pagina: "alvara",
      link: "/servicos/alvara",
      origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte",
      publico: ["Empresas"],
      secretaria: "Fazenda",
      categoria: "Licenças",
      descricao: "Solicitação de alvarás",
      icon: "Building",
      gratuito: false,
      requerLogin: true
    },
    {
      id: "7",
      nome: "Consulta de Processos",
      pagina: "processos",
      link: "/servicos/processos",
      origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/andamento-processo/",
      publico: ["Cidadãos", "Empresas"],
      secretaria: "Administração",
      categoria: "Protocolo",
      descricao: "Acompanhamento processual",
      icon: "FileText",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "8",
      nome: "Agendamento Fazenda",
      pagina: "agendamento-fazenda",
      link: "/servicos/agendamento-fazenda",
      origem: "https://agendamento.araguaina.to.gov.br/#/",
      publico: ["Cidadãos", "Empresas"],
      secretaria: "Fazenda",
      categoria: "Atendimento",
      descricao: "Agendamento Secretaria da Fazenda",
      icon: "Calendar",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "9",
      nome: "Certidões Negativas",
      pagina: "certidoes",
      link: "/servicos/certidoes",
      publico: ["Cidadãos", "Empresas"],
      secretaria: "Fazenda",
      categoria: "Tributário",
      descricao: "Emissão de certidões",
      icon: "FileText",
      gratuito: true,
      requerLogin: false,
      subServicos: [
        {
          id: "9-1",
          nome: "Certidão Negativa",
          pagina: "certidao-negativa",
          link: "/servicos/certidoes/negativa",
          origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte",
          publico: ["Cidadãos", "Empresas"],
          secretaria: "Fazenda",
          categoria: "Tributário",
          descricao: "Emitir certidão negativa de débitos",
          icon: "FileCheck",
          gratuito: true,
          requerLogin: true
        }
      ]
    },
    {
      id: "10",
      nome: "Transparência",
      pagina: "transparencia",
      link: "/servicos/transparencia",
      origem: "https://transparencia.araguaina.to.gov.br/",
      publico: ["Cidadãos"],
      secretaria: "Controladoria",
      categoria: "Transparência",
      descricao: "Portal da transparência",
      icon: "Eye",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "11",
      nome: "Ouvidoria",
      pagina: "ouvidoria",
      link: "/servicos/ouvidoria",
      origem: "https://ouvidoria.araguaina.to.gov.br/",
      publico: ["Cidadãos"],
      secretaria: "Controladoria",
      categoria: "Atendimento",
      descricao: "Canal de comunicação",
      icon: "MessageSquare",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "12",
      nome: "MEI - Microempreendedor",
      pagina: "mei",
      link: "/servicos/mei",
      origem: "https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei",
      publico: ["Empresas"],
      secretaria: "Fazenda",
      categoria: "Empresarial",
      descricao: "Cadastro MEI",
      icon: "Users",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "13",
      nome: "Consulta de Multas",
      pagina: "multas",
      link: "/servicos/multas",
      publico: ["Cidadãos"],
      secretaria: "ASTT",
      categoria: "Trânsito",
      descricao: "Multas de trânsito",
      icon: "AlertTriangle",
      gratuito: true,
      requerLogin: false,
      subServicos: [
        {
          id: "13-1",
          nome: "Consultar Multas",
          pagina: "multas-consulta",
          link: "/servicos/multas/consulta",
          origem: "https://www.detran.to.gov.br/",
          publico: ["Cidadãos"],
          secretaria: "ASTT",
          categoria: "Trânsito",
          descricao: "Consultar multas de trânsito",
          icon: "Search",
          gratuito: true,
          requerLogin: false
        }
      ]
    },
    {
      id: "14",
      nome: "Infrações de Trânsito",
      pagina: "infracoes-transito",
      link: "/servicos/infracoes-transito",
      origem: "https://www.detran.to.gov.br/",
      publico: ["Cidadãos"],
      secretaria: "ASTT",
      categoria: "Trânsito",
      descricao: "Consulta infrações online",
      icon: "Car",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "15",
      nome: "Diário Oficial",
      pagina: "diario-oficial",
      link: "/servicos/diario-oficial",
      origem: "https://diariooficial.araguaina.to.gov.br/",
      publico: ["Cidadãos"],
      secretaria: "Casa Civil",
      categoria: "Informação",
      descricao: "Publicações oficiais",
      icon: "Newspaper",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "16",
      nome: "Contra Cheque",
      pagina: "contra-cheque",
      link: "/servicos/contra-cheque",
      origem: "https://araguaina.prodataweb.inf.br/sig/app.html#/servicosonline/portal-servidor",
      publico: ["Servidores"],
      secretaria: "Administração",
      categoria: "Servidor",
      descricao: "Servidores municipais",
      icon: "FileText",
      gratuito: true,
      requerLogin: true
    },
    {
      id: "17",
      nome: "Crédito Educativo",
      pagina: "credito-educativo",
      link: "/servicos/credito-educativo",
      origem: "https://aux.araguaina.to.gov.br/CreditoEducativo/",
      publico: ["Cidadãos"],
      secretaria: "Educação",
      categoria: "Educação",
      descricao: "Programa educacional",
      icon: "GraduationCap",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "18",
      nome: "Código de Edificações",
      pagina: "codigo-edificacoes",
      link: "/servicos/codigo-edificacoes",
      origem: "https://www.araguaina.to.gov.br/arquivos/codigo-edificacoes.pdf",
      publico: ["Cidadãos", "Empresas"],
      secretaria: "Planejamento",
      categoria: "Legislação",
      descricao: "Normas municipais",
      icon: "Building2",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "19",
      nome: "Código de Postura",
      pagina: "codigo-postura",
      link: "/servicos/codigo-postura",
      origem: "https://www.araguaina.to.gov.br/arquivos/codigo-postura.pdf",
      publico: ["Cidadãos", "Empresas"],
      secretaria: "Planejamento",
      categoria: "Legislação",
      descricao: "Regulamentos municipais",
      icon: "BookOpen",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "20",
      nome: "Créditos Tributários",
      pagina: "creditos-tributarios",
      link: "/servicos/creditos-tributarios",
      origem: "https://araguainato.webiss.com.br/",
      publico: ["Empresas"],
      secretaria: "Fazenda",
      categoria: "Tributário",
      descricao: "Consulta créditos",
      icon: "DollarSign",
      gratuito: true,
      requerLogin: true
    },
    {
      id: "21",
      nome: "Declaração de Cargos",
      pagina: "declaracao-cargos",
      link: "/servicos/declaracao-cargos",
      publico: ["Servidores"],
      secretaria: "Administração",
      categoria: "Servidor",
      descricao: "Acumulação de cargos públicos",
      icon: "UserCheck",
      gratuito: true,
      requerLogin: false
    },
    {
      id: "22",
      nome: "Declaração de Bens",
      pagina: "declaracao-bens",
      link: "/servicos/declaracao-bens",
      publico: ["Servidores"],
      secretaria: "Administração",
      categoria: "Servidor",
      descricao: "Para posse em cargo público",
      icon: "ClipboardList",
      gratuito: true,
      requerLogin: false
    },
    // Novos serviços identificados na análise
    {
      id: "23",
      nome: "Taxa de Coleta de Lixo",
      pagina: "taxa-lixo",
      link: "/servicos/taxa-lixo",
      origem: "https://sig.araguaina.to.gov.br/sig/app.html#/servicosonline/debito-contribuinte",
      publico: ["Cidadãos"],
      secretaria: "Fazenda",
      categoria: "Tributário",
      descricao: "Emissão de guias da taxa de lixo",
      icon: "Trash2",
      gratuito: true,
      requerLogin: true
    },
    {
      id: "24",
      nome: "Licenciamento Ambiental",
      pagina: "licenciamento-ambiental",
      link: "/servicos/licenciamento-ambiental",
      origem: "http://moderniza.araguaina.to.gov.br/Publico/LicenciamentoAmb/Pagina/home",
      publico: ["Empresas"],
      secretaria: "Meio Ambiente",
      categoria: "Licenças",
      descricao: "Licenciamento ambiental municipal",
      icon: "Leaf",
      gratuito: false,
      requerLogin: true
    },
    {
      id: "25",
      nome: "Sistema de Consignações",
      pagina: "consignacoes",
      link: "/servicos/consignacoes",
      origem: "https://saec.consiglog.com.br/",
      publico: ["Servidores"],
      secretaria: "Administração",
      categoria: "Servidor",
      descricao: "Gestão de consignações",
      icon: "CreditCard",
      gratuito: true,
      requerLogin: true
    },
    {
      id: "26",
      nome: "DAT - Declaração de Acidente",
      pagina: "dat",
      link: "/servicos/dat",
      origem: "https://dat.araguaina.to.gov.br/",
      publico: ["Cidadãos"],
      secretaria: "ASTT",
      categoria: "Trânsito",
      descricao: "Declaração de acidente de trânsito",
      icon: "AlertCircle",
      gratuito: true,
      requerLogin: false
    }    {
      id: "51",
      nome: "Consulta Consolidada de D�bitos",
      pagina: "debitos",
      link: "/servicos/debitos",
      publico: ["Cidaduos", "Empresas"],
      secretaria: "Fazenda",
      categoria: "Tributorio",
      descricao: "Visualize todos os d�bitos do contribuinte em um s� lugar",
      icon: "List",
      gratuito: true,
      requerLogin: true
    },
  ],
  categorias: {
    "Cidadão": ["1", "4", "7", "8", "9", "10", "11", "13", "14", "15", "17", "18", "19", "23", "26"],
    "Empresas": ["1", "2", "3", "4", "5", "6", "8", "9", "12", "18", "19", "20", "24", "51"],
    "Servidores": ["16", "21", "22", "25"],
    "Tributário": ["1", "2", "3", "9", "20", "23"],
    "Protocolo": ["4", "7"],
    "Licenças": ["5", "6", "24"],
    "Atendimento": ["8", "11"],
    "Trânsito": ["13", "14", "26"],
    "Informação": ["15", "18", "19"],
    "Servidor": ["16", "21", "22", "25"],
    "Educação": ["17"],
    "Legislação": ["18", "19"],
    "Empresarial": ["12"],
    "Transparência": ["10"]
  },
  linksGenericos: {
    "MinhasSolicitacoes": "https://cidades.serpro.gov.br/",
    "FaleConosco": "https://www.araguaina.to.gov.br/fale-conosco",
    "GaleriaAplicativos": "https://www.araguaina.to.gov.br/aplicativos",
    "TelefonesUteis": "https://www.araguaina.to.gov.br/telefones-uteis",
    "VTN": "https://www.araguaina.to.gov.br/vtn",
    "Radares": "https://aux.araguaina.to.gov.br/portal/pdf/RadaresExistentes2023.pdf",
    "ControleEstoque": "https://www.araguaina.to.gov.br/controle-estoque",
    "LeilaoPublico": "https://www.araguaina.to.gov.br/leilao-2023",
    "OuvidoriaSUS": "https://www.araguaina.to.gov.br/ouvidoria-sus",
    "Transparencia": "https://transparencia.araguaina.to.gov.br/",
    "DiarioOficial": "https://diariooficial.araguaina.to.gov.br/",
    "Ouvidoria": "https://ouvidoria.araguaina.to.gov.br/"
  }
};

export const getServiceById = (id: string): ServiceDetail | undefined => {
  const findService = (services: ServiceDetail[]): ServiceDetail | undefined => {
    for (const service of services) {
      if (service.id === id) return service;
      if (service.subServicos) {
        const found = findService(service.subServicos);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  return findService(servicesCatalog.servicos);
};

export const getServicesByCategory = (category: string): ServiceDetail[] => {
  const serviceIds = servicesCatalog.categorias[category] || [];
  return serviceIds.map(id => getServiceById(id)).filter(Boolean) as ServiceDetail[];
};

export const getServicesByPublic = (publicType: string): ServiceDetail[] => {
  return servicesCatalog.servicos.filter(service => 
    service.publico.includes(publicType)
  );
};


