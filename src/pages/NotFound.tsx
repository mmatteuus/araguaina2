import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { NavbarAccessibilityButtons } from "@/components/NavbarAccessibilityButtons";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <NavbarAccessibilityButtons />
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
          <p className="text-xl text-foreground font-semibold mb-4">Oops! Page not found</p>
          <a href="/" className="text-primary hover:text-primary/80 underline font-medium">
            Return to Home
          </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
