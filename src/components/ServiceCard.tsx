import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Users, Calendar, MapPin, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { getServiceRoute } from "@/utils/serviceRoutes";

interface Service {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

const getIconForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'tributos':
      return <CreditCard className="w-8 h-8 text-primary" />;
    case 'cidadao':
      return <Users className="w-8 h-8 text-primary" />;
    case 'eventos':
      return <Calendar className="w-8 h-8 text-primary" />;
    case 'documentos':
      return <FileText className="w-8 h-8 text-primary" />;
    case 'localizacao':
      return <MapPin className="w-8 h-8 text-primary" />;
    default:
      return <FileText className="w-8 h-8 text-primary" />;
  }
};

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            {getIconForCategory(service.category)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {service.title}
            </h3>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">
          {service.description}
        </p>
        
        <div className="mt-auto">
          <Button 
            asChild 
            className="w-full bg-gradient-primary hover:bg-primary/90 transition-all duration-200"
          >
            <Link 
              to={getServiceRoute(service.id)}
              className="flex items-center justify-center space-x-2"
            >
              <span>Acessar Serviço</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};