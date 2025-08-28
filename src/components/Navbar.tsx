import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export const Navbar = () => {
  const {
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    highContrast
  } = useAccessibility();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">
              Prefeitura de Araguaína
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={increaseFontSize}
              className="text-xs px-2 py-1"
              aria-label="Aumentar tamanho da fonte"
            >
              A+
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFontSize}
              className="text-xs px-2 py-1"
              aria-label="Tamanho normal da fonte"
            >
              A
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseFontSize}
              className="text-xs px-2 py-1"
              aria-label="Diminuir tamanho da fonte"
            >
              A-
            </Button>
            <Button
              variant={highContrast ? "default" : "outline"}
              size="sm"
              onClick={toggleHighContrast}
              className="text-xs px-3 py-1"
              aria-label="Alternar alto contraste"
            >
              Alto Contraste
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};