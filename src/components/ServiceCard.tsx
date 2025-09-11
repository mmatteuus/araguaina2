import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, FileText, Users, Calendar, MapPin, CreditCard, Building, 
  Shield, Eye, MessageSquare, AlertTriangle, Newspaper, GraduationCap, Building2,
  BookOpen, DollarSign, UserCheck, ClipboardList, Car
} from "lucide-react";
import { Link } from "react-router-dom";
import { getServiceRoute } from "@/utils/serviceRoutes";

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const getIconForService = (iconName: string) => {
  const iconMap: Record<string, JSX.Element> = {
    'CreditCard': <CreditCard className="w-8 h-8 text-primary" />,
    'Building': <Building className="w-8 h-8 text-primary" />,
    'FileText': <FileText className="w-8 h-8 text-primary" />,
    'Users': <Users className="w-8 h-8 text-primary" />,
    'Shield': <Shield className="w-8 h-8 text-primary" />,
    'Calendar': <Calendar className="w-8 h-8 text-primary" />,
    'Eye': <Eye className="w-8 h-8 text-primary" />,
    'MessageSquare': <MessageSquare className="w-8 h-8 text-primary" />,
    'MapPin': <MapPin className="w-8 h-8 text-primary" />,
    'AlertTriangle': <AlertTriangle className="w-8 h-8 text-primary" />,
    'Newspaper': <Newspaper className="w-8 h-8 text-primary" />,
    'GraduationCap': <GraduationCap className="w-8 h-8 text-primary" />,
    'Building2': <Building2 className="w-8 h-8 text-primary" />,
    'BookOpen': <BookOpen className="w-8 h-8 text-primary" />,
    'DollarSign': <DollarSign className="w-8 h-8 text-primary" />,
    'UserCheck': <UserCheck className="w-8 h-8 text-primary" />,
    'ClipboardList': <ClipboardList className="w-8 h-8 text-primary" />,
    'Car': <Car className="w-8 h-8 text-primary" />
  };
  
  return iconMap[iconName] || <FileText className="w-8 h-8 text-primary" />;
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
            {getIconForService(service.icon)}
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
            className="w-full bg-gradient-primary hover:bg-primary hover:scale-105 hover:shadow-xl transition-all duration-300 transform hover:shadow-primary/30"
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