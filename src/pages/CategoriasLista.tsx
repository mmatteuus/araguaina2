import { useParams, Link } from "react-router-dom";
import data from "@/data/servicos.json";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

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

const CategoriasLista = () => {
  const { categoria } = useParams<{ categoria: string }>();
  const categorias = (data.categorias as Categoria[]) || [];
  const cat = categorias.find((c) => c.id === categoria);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-hero bg-clip-text text-transparent">
              {cat ? cat.titulo : "Categoria"}
            </h1>
            <p className="text-xl font-bold text-foreground max-w-2xl mx-auto">
              {cat ? `Serviços da categoria ${cat.titulo}` : "Categoria não encontrada"}
            </p>
          </div>

          {!cat && (
            <div className="text-center text-foreground font-semibold">Categoria não encontrada.</div>
          )}

          {cat && cat.servicos.length === 0 && (
            <div className="max-w-xl mx-auto text-center bg-muted/30 border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-2">Em produção</h2>
              <p className="text-foreground font-semibold">O catálogo desta categoria está em produção e será publicado em breve.</p>
            </div>
          )}

          {cat && cat.servicos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.servicos.map((serv) => (
                <Card key={serv.slug} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                          {serv.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-foreground text-sm font-semibold mb-6 flex-grow line-clamp-3">
                      {serv.secretaria_responsavel || serv.category}
                    </p>
                    <div className="mt-auto">
                      <Button asChild className="w-full bg-gradient-primary hover:bg-primary hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:shadow-primary/30 text-white font-semibold">
                        <Link to={`/servicos/${serv.slug}`} className="flex items-center justify-center space-x-2 text-white">
                          <span className="text-white font-semibold">Acessar</span>
                        </Link>
                      </Button>
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

export default CategoriasLista;
