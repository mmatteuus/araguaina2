import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVICOS } from "@/data/servicos";

type ExternalRedirectProps = {
  /**
   * Optional alias to use instead of reading from route params.
   * Allows wiring static routes like `/iptu`.
   */
  alias?: string;
};

export default function ExternalRedirect({ alias }: ExternalRedirectProps) {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const key = (alias ?? slug ?? "").trim().toLowerCase();

    if (!key) {
      navigate("/", { replace: true });
      return;
    }

    const match = SERVICOS.find((service) => {
      if (service.slug.toLowerCase() === key) {
        return true;
      }

      return service.aliases?.some((candidate) => candidate.toLowerCase() === key);
    });

    if (match) {
      console.info("[servico-redirect]", key, "->", match.url);
      window.location.replace(match.url);
      return;
    }

    navigate("/", { replace: true });
  }, [alias, slug, navigate]);

  return <p className="p-6">Redirecionando...</p>;
}
