import data from "@/data/servicos.json";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { services as fallbackServicesAll } from "@/data/services";
import { mapToMainCategoryId } from "@/utils/categoryMap";
import { slugify } from "@/utils/slugify";
import { getServiceRoute } from "@/utils/serviceRoutes";

type Servico = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  url_pagina_servico: string;
  url_destino_final: string;
  tipo_destino_final: string;
  audience?: string[];
  secretaria_responsavel?: string;
  observacoes?: string;
  isFallback?: boolean;
};

type Categoria = {
  id: string;
  titulo: string;
  servicos: Servico[];
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Buscar = () => {
  const categorias = (data.categorias as Categoria[]) || [];
  const jsonAll: Servico[] = categorias.flatMap((c) => c.servicos.map((s) => ({ ...s, category: c.titulo })));
  const fallbackAll: Servico[] = (fallbackServicesAll || []).map((s) => ({
    id: s.id,
    title: s.title,
    slug: slugify(s.title),
    category: categorias.find((c) => c.id === mapToMainCategoryId(s.category))?.titulo || mapToMainCategoryId(s.category),
    url_pagina_servico: "",
    url_destino_final: "",
    tipo_destino_final: "interno",
    isFallback: true,
  }));
  const allMap = new Map<string, Servico>();
  for (const s of jsonAll) allMap.set(s.slug, s);
  for (const s of fallbackAll) if (!allMap.has(s.slug)) allMap.set(s.slug, s);
  const all: Servico[] = Array.from(allMap.values());

  const query = useQuery();
  const navigate = useNavigate();
  const [term, setTerm] = useState(query.get('q') || '');
  const catPref = query.get('cat') || '';
  const catTitle = useMemo(() => categorias.find((c) => c.id === catPref)?.titulo, [catPref, categorias]);

  useEffect(() => {
    setTerm(query.get('q') || '');
  }, [query]);

  const results = useMemo(() => {
    const t = (term || '').trim().toLowerCase();
    if (!t) return [] as Servico[];
    const filtered = all.filter((s) => {
      return (
        (s.title || '').toLowerCase().includes(t) ||
        (s.slug || '').toLowerCase().includes(t) ||
        (s.category || '').toLowerCase().includes(t) ||
        (s.secretaria_responsavel || '').toLowerCase().includes(t)
      );
    });
    if (catTitle) {
      const score = (s: Servico) => (s.category === catTitle ? 0 : 1);
      filtered.sort((a, b) => score(a) - score(b));
    }
    return filtered;
  }, [term, all, catTitle]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/buscar?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-6 flex items-center gap-2">
            <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Buscar serviços por nome, categoria ou secretaria..."
                  className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-foreground text-sm"
                />
              </div>
              <Button type="submit" className="whitespace-nowrap">Buscar</Button>
            </form>
          </div>

          {term && results.length === 0 && (
            <div className="text-center text-foreground font-semibold">Nenhum resultado encontrado para "{term}".</div>
          )}

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((serv) => (
                <Card key={serv.slug} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">{serv.title}</h3>
                        <p className="text-xs text-muted-foreground font-semibold">{serv.category}</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      {serv.isFallback && serv.id ? (
                        <Button asChild variant="primaryGradient" className="w-full">
                          <Link to={getServiceRoute(serv.id)}>Acessar</Link>
                        </Button>
                      ) : (
                        <Button asChild variant="primaryGradient" className="w-full">
                          <Link to={`/servicos/${serv.slug}`}>Acessar</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Buscar;
