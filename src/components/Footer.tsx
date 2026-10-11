import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-20">
    <div className="container py-10 flex flex-col md:flex-row gap-4 justify-between items-start text-sm text-muted-foreground">
      <div>
        <p className="font-display text-base font-semibold uppercase tracking-wide text-foreground">
          Projekt Blå Blink
        </p>
        <p className="mt-1 max-w-md">
          Fiktivt rollespilsfællesskab i FiveM. Ikke tilknyttet offentlige
          myndigheder eller Rockstar Games.
        </p>
      </div>
      <nav className="flex gap-6" aria-label="Sidefod">
        <Link to="/privatlivspolitik" className="hover:text-foreground transition-colors">
          Privatlivspolitik
        </Link>
        <Link to="/vilkaar" className="hover:text-foreground transition-colors">
          Vilkår
        </Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
