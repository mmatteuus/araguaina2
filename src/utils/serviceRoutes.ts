export const getServiceRoute = (serviceId: string): string => {
  const routes: Record<string, string> = {
    "1": "/servicos/iptu",
    "2": "/servicos/iss", 
    "3": "/servicos/nota-fiscal",
    "4": "/servicos/protocolo",
    "5": "/servicos/licenca-sanitaria",
    "6": "/servicos/alvara",
    "7": "/servicos/processos",
    "8": "/servicos/agendamento-fazenda",
    "9": "/servicos/certidoes",
    "10": "/servicos/transparencia",
    "11": "/servicos/ouvidoria",
    "12": "/servicos/mei",
    "13": "/servicos/multas",
    "14": "/servicos/infracoes-transito",
    "15": "/servicos/diario-oficial",
    "16": "/servicos/contra-cheque", 
    "17": "/servicos/credito-educativo",
    "18": "/servicos/codigo-edificacoes",
    "19": "/servicos/codigo-postura",
    "20": "/servicos/creditos-tributarios",
    "21": "/servicos/declaracao-cargos",
    "22": "/servicos/declaracao-bens"
  };
  
  return routes[serviceId] || "/";
};