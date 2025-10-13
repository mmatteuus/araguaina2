import { Shield, Award, CheckCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-foreground">Certificado Digital</span>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 max-w-md mx-auto mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground">Portal Oficial Verificado</span>
              </div>
              <p className="text-xs text-foreground font-medium mb-3">
                Este portal é oficialmente certificado pela Prefeitura Municipal de Araguaína-TO
              </p>
              
              <div className="flex items-center justify-center space-x-1 text-xs text-primary font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Conexão Segura SSL/TLS</span>
              </div>
            </div>
            
            <div className="text-xs text-foreground font-medium space-y-1">
              <p><strong>Certificado emitido para:</strong> Prefeitura Municipal de Araguaína</p>
              <p><strong>CNPJ:</strong> 25.234.525/0001-18</p>
              <p><strong>Válido até:</strong> 31/12/2024</p>
              <p><strong>Autoridade Certificadora:</strong> ICP-Brasil</p>
            </div>
          </div>
        </div>
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
