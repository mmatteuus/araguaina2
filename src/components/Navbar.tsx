import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useMemo, useRef, useState } from "react";
import data from "@/data/servicos.json";
import { services as fallbackServicesAll } from "@/data/services";
import { mapToMainCategoryId } from "@/utils/categoryMap";
import { slugify } from "@/utils/slugify";
import { getServiceRoute } from "@/utils/serviceRoutes";

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/categorias";
  const currentCatId = pathname.startsWith('/categorias/') ? pathname.split('/')[2] : '';
  const [term, setTerm] = useState("");
  const [openSmallSearch, setOpenSmallSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  type Servico = { title: string; slug: string; category: string; isFallback?: boolean; id?: string };
  type Categoria = { id: string; titulo: string; servicos: Servico[] };
  const categorias = (data.categorias as Categoria[]) || [];
  const jsonAll: Servico[] = useMemo(() => categorias.flatMap((c) => c.servicos.map((s) => ({ ...s, category: c.titulo }))), [categorias]);
  const fallbackAll: Servico[] = useMemo(() => (fallbackServicesAll || []).map((s) => ({
    id: s.id,
    title: s.title,
    slug: slugify(s.title),
    category: categorias.find((c) => c.id === mapToMainCategoryId(s.category))?.titulo || mapToMainCategoryId(s.category),
    isFallback: true,
  })), [categorias]);
  const all: Servico[] = useMemo(() => {
    const m = new Map<string, Servico>();
    for (const s of jsonAll) m.set(s.slug, s);
    for (const s of fallbackAll) if (!m.has(s.slug)) m.set(s.slug, s);
    return Array.from(m.values());
  }, [jsonAll, fallbackAll]);
  const suggestions = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return [] as Servico[];
    const currentCatId = pathname.startsWith('/categorias/') ? pathname.split('/')[2] : '';
    const currentCatTitle = categorias.find((c) => c.id === currentCatId)?.titulo;
    const filtered = all.filter((s) => (s.title || "").toLowerCase().includes(t) || (s.category || "").toLowerCase().includes(t) || (s.slug || "").includes(t));
    if (currentCatTitle) {
      const score = (s: Servico) => (s.category === currentCatTitle ? 0 : 1);
      filtered.sort((a, b) => score(a) - score(b));
    }
    return filtered.slice(0, 6);
  }, [term, all, pathname, categorias]);

  const highlight = (text: string, q: string) => {
    const t = q.trim();
    if (!t) return text;
    const parts = text.split(new RegExp(`(${t})`, 'ig'));
    return parts.map((p, i) =>
      p.toLowerCase() === t.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-foreground px-0.5 rounded-sm">{p}</mark>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  };

  const onBack = () => {
    if (isHome) return;
    if (typeof window !== 'undefined' && window.history.length > 1) navigate(-1);
    else navigate('/categorias');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/buscar?q=${encodeURIComponent(q)}${currentCatId ? `&cat=${currentCatId}` : ''}`);
    setTerm("");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#003EDC] to-[#005EDC] border-b shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="grid grid-cols-3 items-center min-h-[48px] sm:min-h-[56px] gap-2">
          <div className="flex items-center gap-2 sm:gap-3 justify-start">
            {!isHome && (
              <Button variant="outline" size="sm" onClick={onBack} className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-1">Voltar</span>
              </Button>
            )}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg truncate max-w-[45vw] sm:max-w-[60vw]">
              Prefeitura de Araguaína
            </h1>
          </div>
          {/* Busca desktop/tablet centralizada */}
          <form onSubmit={onSubmit} className="hidden sm:flex items-center gap-2 relative justify-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80" />
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Buscar serviços..."
                className="w-36 sm:w-56 md:w-72 pl-9 pr-3 py-2 rounded-md border border-white/30 bg-white/20 text-white placeholder:text-white/80 focus:outline-none"
              />
            </div>
            <Button type="submit" size="sm" className="bg-white/20 hover:bg-white/30 text-white">Buscar</Button>
            {term && (
              <div className="absolute top-[110%] right-0 w-[min(90vw,28rem)] bg-background border rounded-md shadow-lg p-2 z-50">
                {suggestions.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => s.isFallback && s.id ? navigate(getServiceRoute(s.id)) : navigate(`/servicos/${s.slug}`)}
                    className="w-full text-left px-2 py-2 rounded hover:bg-accent/20 text-foreground"
                  >
                    <div className="text-sm font-bold leading-tight">{highlight(s.title, term)}</div>
                    <div className="text-xs text-muted-foreground">{highlight(s.category, term)}</div>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => navigate(`/buscar?q=${encodeURIComponent(term)}${currentCatId ? `&cat=${currentCatId}` : ''}`)}
                  className="w-full text-left px-2 py-2 rounded hover:bg-accent/20 text-primary font-semibold"
                >
                  Ver todos os resultados para "{term}"
                </button>
              </div>
            )}
          </form>
          {/* Placeholder à direita para alinhamento com botões de acessibilidade flutuantes */}
          <div className="flex justify-end items-center">
            <div className="hidden sm:block w-24" />
            {/* Busca mobile */}
            <div className="sm:hidden">
              {!openSmallSearch ? (
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white" onClick={() => {
                  setOpenSmallSearch(true);
                  setTimeout(() => inputRef.current?.focus(), 0);
                }}>
                  <Search className="w-4 h-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay de busca mobile */}
      {openSmallSearch && (
        <div className="sm:hidden fixed top-[56px] left-0 right-0 z-[60] px-3 pb-3">
          <div className="bg-background/95 backdrop-blur border rounded-lg p-2 shadow-lg">
            <form onSubmit={onSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70" />
                <input
                  ref={inputRef}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="Buscar serviços..."
                  className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-foreground text-sm"
                />
              </div>
              <Button type="submit" size="sm">Ir</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenSmallSearch(false)}>
                <X className="w-4 h-4" />
              </Button>
            </form>
            {term && (
              <div className="mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => { setOpenSmallSearch(false); s.isFallback && s.id ? navigate(getServiceRoute(s.id)) : navigate(`/servicos/${s.slug}`); }}
                    className="w-full text-left px-2 py-2 rounded hover:bg-accent/20 text-foreground"
                  >
                    <div className="text-sm font-bold leading-tight">{highlight(s.title, term)}</div>
                    <div className="text-xs text-muted-foreground">{highlight(s.category, term)}</div>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setOpenSmallSearch(false); navigate(`/buscar?q=${encodeURIComponent(term)}${currentCatId ? `&cat=${currentCatId}` : ''}`); }}
                  className="mt-1 w-full text-left px-2 py-2 rounded hover:bg-accent/20 text-primary font-semibold"
                >
                  Ver todos os resultados para "{term}"
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
