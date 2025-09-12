import { useParams, Link } from "react-router-dom";
import data from "@/data/servicos.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

type Servico = {
  title: string;
  slug: string;
  category: string;
  url_pagina_servico: string;
  url_destino_final: string;
  tipo_destino_final: string;
  audience?: string[];
  secretaria_responsavel?: string;
  observacoes?: string;
};

type Categoria = {
  id: string;
  titulo: string;
  servicos: Servico[];
};

const findServiceBySlug = (slug: string | undefined) => {
  if (!slug) return undefined;
  const categorias = (data.categorias as Categoria[]) || [];
  for (const cat of categorias) {
    const found = cat.servicos.find((s) => s.slug === slug);
    if (found) return found;
  }
  return undefined;
};

const ServicoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const servico = findServiceBySlug(slug);

  const destino = servico?.url_destino_final?.trim() || "";
  const pagina = servico?.url_pagina_servico?.trim() || "";
  const isPdf = servico?.tipo_destino_final === "pdf";

  // Define primary link target
  const primaryHref = destino || pagina || "#";
  const primaryTarget = isPdf || servico?.tipo_destino_final !== "interno" ? "_blank" : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {!servico && (
            <div className="text-center text-foreground font-semibold">Serviço não encontrado.</div>
          )}
          {servico && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {servico.title}
                </h1>
                <p className="text-foreground font-semibold">
                  Categoria: {servico.category}
                </p>
              </div>

              {servico.audience && servico.audience.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Público-alvo</h2>
                  <p className="text-foreground font-semibold">{servico.audience.join(", ")}</p>
                </div>
              )}

              {servico.secretaria_responsavel && (
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Secretaria responsável</h2>
                  <p className="text-foreground font-semibold">{servico.secretaria_responsavel}</p>
                </div>
              )}

              {servico.observacoes && (
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Observações</h2>
                  <p className="text-foreground font-semibold">{servico.observacoes}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="bg-gradient-primary hover:bg-primary text-white font-semibold">
                  <a href={primaryHref} target={primaryTarget} rel={primaryTarget ? "noopener noreferrer" : undefined}>
                    Ir para o serviço
                  </a>
                </Button>
                {pagina && (
                  <Button asChild variant="outline">
                    <a href={pagina} target="_blank" rel="noopener noreferrer">
                      Ver página oficial
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link to={`/categorias/${(servico.category || "").toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                    Voltar para a categoria
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicoDetalhe;

