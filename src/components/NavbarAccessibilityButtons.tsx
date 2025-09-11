import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export const NavbarAccessibilityButtons = () => {
  const {
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    highContrast
  } = useAccessibility();

  return (
    <div className="flex items-center space-x-2 mb-6">
      <Button
        variant="accessibility"
        size="sm"
        onClick={increaseFontSize}
        className="text-xs px-2 py-1"
        aria-label="Aumentar tamanho da fonte"
      >
        A+
      </Button>
      <Button
        variant="accessibility"
        size="sm"
        onClick={resetFontSize}
        className="text-xs px-2 py-1"
        aria-label="Tamanho normal da fonte"
      >
        A
      </Button>
      <Button
        variant="accessibility"
        size="sm"
        onClick={decreaseFontSize}
        className="text-xs px-2 py-1"
        aria-label="Diminuir tamanho da fonte"
      >
        A-
      </Button>
      <Button
        variant={highContrast ? "default" : "accessibility"}
        size="sm"
        onClick={toggleHighContrast}
        className="text-xs px-3 py-1"
        aria-label="Alternar alto contraste"
      >
        Alto Contraste
      </Button>
    </div>
  );
};