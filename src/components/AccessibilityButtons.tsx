import { Button } from "@/components/ui/button";
import { Sun, Moon, Plus, Minus, RotateCcw, Eye } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const AccessibilityButtons = () => {
  const { fontSize, highContrast, increaseFontSize, decreaseFontSize, resetFontSize, toggleHighContrast } = useAccessibility();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div className="accessibility-buttons bg-background/95 border rounded-lg p-2 shadow-lg">
        <div className="flex items-center gap-1">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            title={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
            className="p-2 h-8 w-8"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Font Size Controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={decreaseFontSize}
            disabled={fontSize === 'normal'}
            title="Diminuir fonte"
            className="p-2 h-8 w-8"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={increaseFontSize}
            disabled={fontSize === 'xlarge'}
            title="Aumentar fonte"
            className="p-2 h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={resetFontSize}
            title="Resetar fonte"
            className="p-2 h-8 w-8"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          {/* High Contrast Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleHighContrast}
            title={`${highContrast ? 'Desativar' : 'Ativar'} alto contraste`}
            className="p-2 h-8 w-8"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityButtons;