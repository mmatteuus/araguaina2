import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { services } from "@/data/services";
import DigitalSignature from "@/components/DigitalSignature";

const Index = () => {
  return (
    <AccessibilityProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-20 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Serviços Online
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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

        <footer className="bg-muted py-8 mt-16">
          <div className="container mx-auto px-4">
            <DigitalSignature />
            <div className="text-center mt-8">
              <p className="text-muted-foreground text-sm">
                <a 
                  href="https://api.whatsapp.com/send/?phone=5563992476987&text=Olá,%20vi%20seu%20projeto%20e%20quero%20saber%20mais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Desenvolvido por MtsFerreira
                </a>
              </p>
            </div>
          </div>
        </footer>

        <WhatsAppButton />
      </div>
    </AccessibilityProvider>
  );
};

export default Index;