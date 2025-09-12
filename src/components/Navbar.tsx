import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/categorias";
  const [term, setTerm] = useState("");

  const onBack = () => {
    if (isHome) return;
    navigate(-1);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
    setTerm("");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#003EDC] to-[#005EDC] border-b shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between min-h-[48px] sm:min-h-[56px] gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
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
          <form onSubmit={onSubmit} className="hidden xs:flex items-center gap-2">
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
          </form>
        </div>
      </div>
    </nav>
  );
};
