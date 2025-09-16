import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, ChevronDown } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
    { path: "/rangorden/politi", label: "POLITI" },
    { path: "/rangorden/brand", label: "BRAND" },
    { path: "/rangorden/ems", label: "EMS" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-professional">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="NORDJYSK FIVEPD Logo" 
              className="h-12 w-12 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">NORDJYSK</span>
              <span className="text-sm text-primary font-semibold">FIVEPD</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive(item.path)
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Rangorden Dropdown */}
            <HoverCard openDelay={0} closeDelay={200}>
              <HoverCardTrigger asChild>
                <button
                  className={`font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                    location.pathname.startsWith("/rangorden")
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-foreground"
                  }`}
                >
                  Rangorden
                  <ChevronDown className="w-4 h-4" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-48 p-2" align="center">
                <div className="flex flex-col space-y-1">
                  {rangordenItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-3 py-2 rounded-md font-medium transition-colors text-sm ${
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground"
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
              <Button variant="default" size="sm" className="bg-gradient-hero">
                <Shield className="w-4 h-4 mr-2" />
                Ansøg Nu
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-4 rounded-md font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Rangorden Section */}
              <div className="px-4 py-2">
                <div className="text-sm font-medium text-muted-foreground mb-2">Rangorden</div>
                {rangordenItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-4 ml-2 rounded-md font-medium transition-colors text-sm ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              <Link to="/ansog">
                <Button variant="default" size="sm" className="bg-gradient-hero mx-4 mt-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Ansøg Nu
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;