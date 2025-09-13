import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Building, ClipboardList, MapPin } from "lucide-react";

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
      <main className="pt-24 pb-8">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categorias;
