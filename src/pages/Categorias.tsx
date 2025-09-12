import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Building, ClipboardList, MapPin } from "lucide-react";
import dataJSON from "@/data/servicos.json";

const categorias = [
  { id: "cidadao", titulo: "Cidadão" },
  { id: "educacao", titulo: "Educação" },
  { id: "empresa", titulo: "Empresa" },
  { id: "servidor", titulo: "Servidor" },
  { id: "turista", titulo: "Turista" }
];

const getIconById = (id: string) => {
  switch (id) {
    case "cidadao":
      return Users;
    case "educacao":
      return GraduationCap;
    case "empresa":
      return Building;
    case "servidor":
      return ClipboardList;
    default:
      return MapPin;
  }
};

const Categorias = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-hero bg-clip-text text-transparent">
              Categorias
            </h1>
            <p className="text-xl font-bold text-foreground max-w-2xl mx-auto">
              Escolha uma categoria para visualizar os serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorias.map((cat) => {
              const Icon = getIconById(cat.id);
              return (
                <Link
                  key={cat.id}
                  to={`/categorias/${cat.id}`}
                  aria-label={`Abrir categoria ${cat.titulo}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                >
                  <Card className="transition-all duration-200 border-2 group-hover:border-primary group-hover:bg-primary group-hover:shadow-lg group-active:scale-[0.99]">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 translate-y-[1px] group-hover:scale-105 transition-transform duration-200">
                          <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-200" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground group-hover:text-white transition-colors duration-200">
                          {cat.titulo}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-14 space-y-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Serviços Online</h2>
              <p className="text-foreground font-semibold">Lista oficial por categoria</p>
            </div>

            {(["cidadao", "educacao", "empresa", "servidor", "turista"] as const).map((id) => {
              const catJson: any = (dataJSON as any).categorias?.find((c: any) => c.id === id);
              if (!catJson || !catJson.servicos || catJson.servicos.length === 0) return null;
              return (
                <section key={id} aria-labelledby={`sec-${id}`} className="space-y-4">
                  <h3 id={`sec-${id}`} className="text-xl md:text-2xl font-bold">{`Serviços Online — ${catJson.titulo}`}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catJson.servicos.map((serv: any) => (
                      <Card key={serv.slug} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex-shrink-0">
                              <span className="inline-block w-8 h-8 rounded-full bg-primary/15" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                                {serv.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-foreground text-sm font-semibold mb-6 flex-grow line-clamp-3">
                            {serv.secretaria_responsavel || catJson.titulo}
                          </p>
                          <div className="mt-auto">
                            <Link to={`/servicos/${serv.slug}`} className="inline-block w-full">
                              <div className="w-full text-center py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">Acessar</div>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categorias;

