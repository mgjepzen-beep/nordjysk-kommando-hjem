import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import UserMenu from "@/components/UserMenu";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Hjem" },
    { path: "/om-os", label: "Om Os" },
    { path: "/rekruttering", label: "Rekruttering" },
  ];

  const rangordenItems = [
    { path: "/rangorden/politi", label: "Politi" },
    { path: "/rangorden/brand", label: "Brand" },
    { path: "/rangorden/ems", label: "EMS" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const rangordenActive = location.pathname.startsWith("/rangorden");

  const linkClass = (active: boolean) =>
    `font-medium transition-colors text-sm ${
      active ? "text-primary" : "text-foreground hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="PROJEKT BLÅ BLINK Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-xl font-semibold uppercase tracking-wide leading-none">
              Projekt Blå Blink
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Hovedmenu">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={linkClass(isActive(item.path))}>
                {item.label}
              </Link>
            ))}

            <HoverCard openDelay={100} closeDelay={150}>
              <HoverCardTrigger asChild>
                <button className={`${linkClass(rangordenActive)} flex items-center gap-1`}>
                  Rangorden
                  <ChevronDown className="w-4 h-4" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-44 p-2" align="center">
                <div className="flex flex-col">
                  {rangordenItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>

            <Link to="/ansog">
              <Button size="sm">Ansøg</Button>
            </Link>

            <UserMenu />
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Luk menu" : "Åbn menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4" aria-label="Mobilmenu">
            <div className="flex flex-col divide-y divide-border border-t border-border pt-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 font-medium text-sm ${
                    isActive(item.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="py-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Rangorden
                </div>
                {rangordenItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-1.5 pl-3 text-sm ${
                      isActive(item.path) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3 py-3">
                <Link to="/ansog" onClick={() => setIsOpen(false)}>
                  <Button size="sm">Ansøg</Button>
                </Link>
                <UserMenu />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navigation;
