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
    'CreditCard': <CreditCard className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Building': <Building className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'FileText': <FileText className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Users': <Users className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Shield': <Shield className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Calendar': <Calendar className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Eye': <Eye className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'MessageSquare': <MessageSquare className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'MapPin': <MapPin className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'AlertTriangle': <AlertTriangle className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Newspaper': <Newspaper className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'GraduationCap': <GraduationCap className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Building2': <Building2 className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'BookOpen': <BookOpen className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'DollarSign': <DollarSign className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'UserCheck': <UserCheck className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'ClipboardList': <ClipboardList className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />,
    'Car': <Car className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />
  };
  
  return iconMap[iconName] || <FileText className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-200" />;
};

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full bg-muted hover:bg-gradient-primary">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            {getIconForService(service.icon)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-colors duration-200 line-clamp-2">
              {service.title}
            </h3>
          </div>
        </div>
        
        <p className="text-muted-foreground group-hover:text-white/90 text-sm mb-6 flex-grow line-clamp-3 transition-colors duration-200">
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