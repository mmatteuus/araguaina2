import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { services } from "@/data/services";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
      <div className="min-h-screen bg-background">
        
        <main className="pt-20 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Serviços Online
              </h1>
              <p className="text-xl font-bold text-foreground max-w-2xl mx-auto">
                Acesse os serviços da Prefeitura de Araguaína de forma rápida e segura
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </main>

        <Footer />

        <WhatsAppButton />
      </div>
  );
};

export default Index;
