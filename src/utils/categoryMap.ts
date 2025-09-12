export type MainCategoryId = "cidadao" | "educacao" | "empresa" | "servidor" | "turista";

// Mapeia categorias antigas para as 5 principais
export function mapToMainCategoryId(label: string | undefined): MainCategoryId {
  const l = (label || "").toLowerCase();
  if (/(empresarial|empresa|iss|nfs|nota fiscal)/i.test(label || "")) return "empresa";
  if (/(servidor|contra\s*cheque|impar|licen[çc]a|recursos humanos)/i.test(label || "")) return "servidor";
  if (/(educa[çc][ãa]o|escola|estud)/i.test(label || "")) return "educacao";
  if (/(turismo|turista|hotel|ponto tur[íi]stico)/i.test(label || "")) return "turista";
  if (l.includes("empresas")) return "empresa";
  if (l.includes("servidor")) return "servidor";
  // Demais entram como Cidadão por padrão
  return "cidadao";
}

