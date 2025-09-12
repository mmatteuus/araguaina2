import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Building, ClipboardList, MapPin } from "lucide-react";
import { services } from "@/data/services";
import { mapToMainCategoryId } from "@/utils/categoryMap";

const categorias = [
  { id: "cidadao", titulo: "Cidadão", icon: <Users className="w-8 h-8 text-primary" /> },
  { id: "educacao", titulo: "Educação", icon: <GraduationCap className="w-8 h-8 text-primary" /> },
  { id: "empresa", titulo: "Empresa", icon: <Building className="w-8 h-8 text-primary" /> },
  { id: "servidor", titulo: "Servidor", icon: <ClipboardList className="w-8 h-8 text-primary" /> },
  { id: "turista", titulo: "Turista", icon: <MapPin className="w-8 h-8 text-primary" /> }
];

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
            {categorias.map((cat) => (
              <Card key={cat.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-shrink-0">{cat.icon}</div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {cat.titulo}
                    </h3>
                  </div>
                  <div className="mt-auto">
                    <Button asChild variant="primaryGradient" className="w-full hover:scale-105">
                      <Link to={`/categorias/${cat.id}`} className="flex items-center justify-center space-x-2 text-white">
                        <span className="text-white font-semibold">Acessar</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-14">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Serviços Online</h2>
              <p className="text-foreground font-semibold">Atalhos para serviços, agora levando à categoria correspondente</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => {
                const catId = mapToMainCategoryId(s.category);
                return (
                  <Card key={s.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-shrink-0">
                          {/* simples marcador, sem ícone específico aqui para manter leve */}
                          <span className="inline-block w-8 h-8 rounded-full bg-primary/15" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {s.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-foreground text-sm font-semibold mb-6 flex-grow line-clamp-3">
                        {s.description}
                      </p>
                      <div className="mt-auto">
                        <Button asChild variant="primaryGradient" className="w-full">
                          <Link to={`/categorias/${catId}`}>Ir para a categoria</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categorias;
