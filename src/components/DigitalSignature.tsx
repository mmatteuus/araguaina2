import { Shield, Award, CheckCircle } from "lucide-react";

const DigitalSignature = () => {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Shield className="w-6 h-6 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Certificado Digital</span>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 max-w-md mx-auto mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Portal Oficial Verificado</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Este portal é oficialmente certificado pela Prefeitura Municipal de Araguaína-TO
          </p>
          
          <div className="flex items-center justify-center space-x-1 text-xs text-success">
            <CheckCircle className="w-4 h-4" />
            <span>Conexão Segura SSL/TLS</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Certificado emitido para:</strong> Prefeitura Municipal de Araguaína</p>
          <p><strong>CNPJ:</strong> 25.234.525/0001-18</p>
          <p><strong>Válido até:</strong> 31/12/2024</p>
          <p><strong>Autoridade Certificadora:</strong> ICP-Brasil</p>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignature;