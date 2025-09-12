export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export const services = [
  {
    id: "1",
    title: "IPTU",
    description: "Consulta e emissão de guias",
    category: "Tributário",
    icon: "CreditCard"
  },
  {
    id: "2", 
    title: "ISS - Imposto Sobre Serviços",
    description: "Imposto sobre Serviços",
    category: "Tributário",
    icon: "Building"
  },
  {
    id: "3",
    title: "Nota Fiscal Eletrônica",
    description: "Emissão de NFSe",
    category: "Tributário", 
    icon: "FileText"
  },
  {
    id: "4",
    title: "Protocolo Digital",
    description: "Abertura de protocolos",
    category: "Protocolo",
    icon: "Users"
  },
  {
    id: "5",
    title: "Licença Sanitária",
    description: "Licenças para estabelecimentos",
    category: "Licenças",
    icon: "Shield"
  },
  {
    id: "6",
    title: "Alvará de Funcionamento",
    description: "Solicitação de alvarás",
    category: "Licenças",
    icon: "Building"
  },
  {
    id: "7",
    title: "Consulta de Processos",
    description: "Acompanhamento processual",
    category: "Protocolo",
    icon: "FileText"
  },
  {
    id: "8",
    title: "Agendamento Fazenda",
    description: "Agendamento Secretaria da Fazenda",
    category: "Atendimento",
    icon: "Calendar"
  },
  {
    id: "9",
    title: "Certidões Negativas",
    description: "Emissão de certidões",
    category: "Tributário",
    icon: "FileText"
  },
  {
    id: "10",
    title: "Transparência",
    description: "Portal da transparência",
    category: "Transparência",
    icon: "Eye"
  },
  {
    id: "11",
    title: "Ouvidoria",
    description: "Canal de comunicação",
    category: "Atendimento",
    icon: "MessageSquare"
  },
  {
    id: "12",
    title: "MEI - Microempreendedor",
    description: "Cadastro MEI",
    category: "Empresarial",
    icon: "Users"
  },
  {
    id: "13",
    title: "Consulta de Multas",
    description: "Multas de trânsito",
    category: "Trânsito",
    icon: "AlertTriangle"
  },
  {
    id: "14",
    title: "Infrações de Trânsito",
    description: "Consulta infrações online",
    category: "Trânsito",
    icon: "Car"
  },
  {
    id: "15",
    title: "Diário Oficial",
    description: "Publicações oficiais",
    category: "Informação",
    icon: "Newspaper"
  },
  {
    id: "16",
    title: "Contra Cheque",
    description: "Servidores municipais",
    category: "Servidor",
    icon: "FileText"
  },
  {
    id: "17",
    title: "Crédito Educativo",
    description: "Programa educacional",
    category: "Educação",
    icon: "GraduationCap"
  },
  {
    id: "18",
    title: "Código de Edificações",
    description: "Normas municipais",
    category: "Legislação",
    icon: "Building2"
  },
  {
    id: "19",
    title: "Código de Postura",
    description: "Regulamentos municipais",
    category: "Legislação",
    icon: "BookOpen"
  },
  {
    id: "20",
    title: "Créditos Tributários",
    description: "Consulta créditos",
    category: "Tributário",
    icon: "DollarSign"
  },
  {
    id: "21",
    title: "Declaração de Cargos",
    description: "Acumulação de cargos públicos",
    category: "Servidor",
    icon: "UserCheck"
  },
  {
    id: "22",
    title: "Declaração de Bens",
    description: "Para posse em cargo público",
    category: "Servidor",
    icon: "ClipboardList"
  },
  {
    id: "23",
    title: "Taxa de Coleta de Lixo",
    description: "Emissão de guias da taxa de lixo",
    category: "Tributário",
    icon: "Trash2"
  },
  {
    id: "24",
    title: "Licenciamento Ambiental",
    description: "Licenciamento ambiental municipal",
    category: "Licenças",
    icon: "Leaf"
  },
  {
    id: "25",
    title: "Sistema de Consignações",
    description: "Gestão de consignações",
    category: "Servidor",
    icon: "CreditCard"
  },
  {
    id: "26",
    title: "DAT - Declaração de Acidente",
    description: "Declaração de acidente de trânsito",
    category: "Trânsito",
    icon: "AlertCircle"
  },
  // Novos serviços - Cidadãos
  {
    id: "27",
    title: "Emitir CCMEI",
    description: "Certificado da Condição de Microempreendedor Individual",
    category: "Empresarial",
    icon: "FileText"
  },
  {
    id: "28",
    title: "FIC - Ficha de Informações Cadastrais",
    description: "Formulário de informações cadastrais",
    category: "Cadastral",
    icon: "ClipboardList"
  },
  {
    id: "29",
    title: "Formulários Crédito Educativo",
    description: "Formulários para crédito educativo",
    category: "Educação",
    icon: "GraduationCap"
  },
  {
    id: "30",
    title: "Plano de Arborização Urbana",
    description: "Plano municipal de arborização",
    category: "Ambiental",
    icon: "Leaf"
  },
  {
    id: "31",
    title: "Plano Municipal de Água e Esgoto",
    description: "PMAE - Documentos e informações",
    category: "Infraestrutura",
    icon: "Droplets"
  },
  {
    id: "32",
    title: "Plano de Gestão de Resíduos",
    description: "Gestão integrada de resíduos sólidos",
    category: "Ambiental",
    icon: "Recycle"
  },
  {
    id: "33",
    title: "Leis, Decretos e Portarias",
    description: "Legislação municipal completa",
    category: "Legislação",
    icon: "BookOpen"
  },
  {
    id: "34",
    title: "Medidores - Estudo Técnico",
    description: "Estudo técnico dos medidores de velocidade",
    category: "Trânsito",
    icon: "Activity"
  },
  {
    id: "35",
    title: "Medidores - Lista de Endereços",
    description: "Endereços dos medidores de velocidade",
    category: "Trânsito",
    icon: "MapPin"
  },
  // Novos serviços - Empresas
  {
    id: "36",
    title: "Validação de NFS-e",
    description: "Validar autenticidade de Nota Fiscal Eletrônica",
    category: "Tributário",
    icon: "CheckCircle"
  },
  {
    id: "37",
    title: "Emitir NFS-e",
    description: "Emissão de Nota Fiscal Eletrônica",
    category: "Tributário",
    icon: "FileText"
  },
  {
    id: "38",
    title: "Guia do Alvará",
    description: "Emitir guia de pagamento do alvará",
    category: "Tributário",
    icon: "CreditCard"
  },
  {
    id: "39",
    title: "Termo Dispensa Vistoria Bombeiros",
    description: "Termo de dispensa da vistoria do Corpo de Bombeiros",
    category: "Licenças",
    icon: "Shield"
  },
  {
    id: "40",
    title: "Atualizar Dados MEI",
    description: "Atualização de dados cadastrais do MEI",
    category: "Empresarial",
    icon: "UserCheck"
  },
  {
    id: "41",
    title: "Baixa do MEI",
    description: "Cancelamento do CNPJ MEI",
    category: "Empresarial",
    icon: "XCircle"
  },
  // Novos serviços - Servidores
  {
    id: "42",
    title: "Contra Cheque IMPAR",
    description: "Sistema IMPAR para contra cheque",
    category: "Servidor",
    icon: "FileText"
  },
  {
    id: "43",
    title: "Formulário Junta Médica",
    description: "Formulário para junta médica",
    category: "Servidor",
    icon: "Heart"
  },
  {
    id: "44",
    title: "Formulário Licença Prêmio",
    description: "Licença prêmio para servidores",
    category: "Servidor",
    icon: "Award"
  },
  {
    id: "45",
    title: "Formulário Férias e LIP",
    description: "Férias e Licença Interesse Particular",
    category: "Servidor",
    icon: "Calendar"
  },
  {
    id: "46",
    title: "Requerimentos Diversos (RD)",
    description: "Formulário de requerimentos diversos",
    category: "Servidor",
    icon: "ClipboardList"
  },
  {
    id: "47",
    title: "Licença Aperfeiçoamento",
    description: "Formulário de licença para aperfeiçoamento",
    category: "Servidor",
    icon: "GraduationCap"
  },
  {
    id: "48",
    title: "Sistema Protocolo Servidor",
    description: "Sistema de protocolo para servidores",
    category: "Servidor",
    icon: "Users"
  },
  // Órgãos / Geral
  {
    id: "49",
    title: "Sistema SIG",
    description: "Sistema de Informações Geográficas",
    category: "Tecnologia",
    icon: "Map"
  },
  {
    id: "50",
    title: "Valores de Terra Nua (VTN)",
    description: "Tabela de valores de terra nua",
    category: "Tributário",
    icon: "MapPin"
  }
];
