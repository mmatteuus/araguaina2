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
    title: "ISS",
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
    title: "Agendamento",
    description: "Agendamento de atendimento",
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
    title: "Mapa da Cidade",
    description: "Localização de serviços",
    category: "Informação",
    icon: "MapPin"
  },
  {
    id: "13",
    title: "MEI - Microempreendedor",
    description: "Cadastro MEI",
    category: "Empresarial",
    icon: "Users"
  },
  {
    id: "14",
    title: "Consulta de Multas",
    description: "Multas de trânsito",
    category: "Trânsito",
    icon: "AlertTriangle"
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
  }
];