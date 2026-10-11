import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 mt-16">
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-4 justify-between text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} NORDJYSK FIVEPD — fiktivt rollespilsfællesskab. Ikke tilknyttet offentlige myndigheder eller Rockstar Games.</p>
      <nav className="flex gap-6">
        <Link to="/privatlivspolitik" className="hover:text-foreground transition-colors">Privatlivspolitik</Link>
        <Link to="/vilkaar" className="hover:text-foreground transition-colors">Vilkår</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
