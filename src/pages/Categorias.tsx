import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Building, ClipboardList, MapPin } from "lucide-react";

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
                    <Button asChild className="w-full bg-gradient-primary hover:bg-primary hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:shadow-primary/30 text-white font-semibold">
                      <Link to={`/categorias/${cat.id}`} className="flex items-center justify-center space-x-2 text-white">
                        <span className="text-white font-semibold">Acessar</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categorias;

