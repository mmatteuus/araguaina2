export const getServiceRoute = (serviceId: string): string => {
  const routes: Record<string, string> = {
    "1": "/servicos/iptu",
    "2": "/servicos/iss", 
    "3": "/servicos/nota-fiscal",
    "4": "/servicos/protocolo",
    "5": "/servicos/licenca-sanitaria",
    "6": "/servicos/alvara",
    "7": "/servicos/processos",
    "8": "/servicos/agendamento",
    "9": "/servicos/certidoes",
    "10": "/servicos/transparencia",
    "11": "/servicos/ouvidoria",
    "12": "/servicos/mapa"
  };
  
  return routes[serviceId] || "/";
};