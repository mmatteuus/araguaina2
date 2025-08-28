import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=556334125572&text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20os%20serviços%20online%20de%20Araguaína";

  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
      aria-label="Atendimento WhatsApp Prefeitura de Araguaína"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 text-secondary-foreground" />
      </a>
    </Button>
  );
};