import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-7xl font-semibold uppercase text-primary mb-4">404</p>
        <h1 className="font-display text-2xl font-semibold uppercase tracking-wide mb-2">
          Siden blev ikke fundet
        </h1>
        <p className="text-muted-foreground mb-6">
          Siden, du leder efter, findes ikke eller er blevet flyttet.
        </p>
        <Link to="/">
          <Button variant="outline">Tilbage til forsiden</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
