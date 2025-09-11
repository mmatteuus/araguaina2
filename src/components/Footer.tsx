import DigitalSignature from "@/components/DigitalSignature";

export const Footer = () => {
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container mx-auto px-4">
        <DigitalSignature />
        <div className="text-center mt-8">
          <p className="text-foreground font-semibold text-sm">
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
  );
};