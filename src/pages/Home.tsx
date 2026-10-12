import { Button } from "@/components/ui/button";
import { Shield, Users, Trophy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroBackground from "@/assets/hero-background.png";

const Home = () => {
  const services = [
    {
      name: "Politi",
      description: "Patruljearbejde, trafik og efterforskning i et realistisk hierarki.",
      color: "bg-primary",
    },
    {
      name: "Brandvæsen",
      description: "Brand og redningsopgaver med fokus på realistiske procedurer.",
      color: "bg-emergency-red",
    },
    {
      name: "Ambulance",
      description: "Medicinsk bistand og transport i samarbejde med de andre tjenester.",
      color: "bg-emergency-yellow",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integritet",
      description: "Vi handler med høj moral og ærlighed i alle situationer.",
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Sammen er vi stærkere - vi støtter hinanden gennem alt.",
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "Vi stræber altid efter at levere den bedste service.",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBackground})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-foreground/70" aria-hidden="true" />
        <div className="container relative py-24 lg:py-36">
          <div className="max-w-3xl">
            <img
              src={logo}
              alt="PROJEKT BLÅ BLINK Logo"
              className="h-16 w-16 lg:h-20 lg:w-20 object-contain mb-8"
            />
            <h1 className="font-display text-6xl lg:text-8xl font-semibold uppercase leading-none tracking-wide text-white">
              Projekt Blå Blink
            </h1>
            <p className="mt-6 max-w-2xl text-lg lg:text-xl text-white/90 leading-relaxed">
              Et professionelt emergency services community. Vi tilbyder politi,
              brandvæsen og ambulance tjeneste i et realistisk FiveM miljø.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link to="/ansog">
                <Button size="lg" className="px-8">
                  Søg om optagelse
                </Button>
              </Link>
              <Link
                to="/om-os"
                className="inline-flex items-center gap-2 text-base font-medium text-white underline-offset-4 hover:underline"
              >
                Læs om projektet
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tjenester */}
      <section className="container py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold uppercase tracking-wide mb-6">
              Hvad er Projekt Blå Blink?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Vi er et dansk FiveM fællesskab, der spiller emergency services
              så tæt på virkeligheden som muligt — med realistiske procedurer,
              klare ansvarsområder og respekt for hinanden.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nye medlemmer starter typisk som kadet og avancerer gennem
              rangordenen efter erfaring og engagement. Læs mere på siden{" "}
              <Link to="/om-os" className="text-primary underline-offset-4 hover:underline">
                Om os
              </Link>
              .
            </p>
          </div>
          <ul className="divide-y divide-border border-t border-b border-border">
            {services.map((service) => (
              <li key={service.name} className="flex items-start gap-4 py-6">
                <span className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-sm ${service.color}`} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Værdier */}
      <section className="border-t border-border bg-muted/60 py-20">
        <div className="container">
          <h2 className="font-display text-3xl lg:text-4xl font-semibold uppercase tracking-wide mb-10">
            Vores værdier
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="border-t-2 border-primary pt-6">
                <value.icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="container py-20">
        <div className="border border-border bg-card p-8 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-4">
                Kom i kontakt med os
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Det meste af vores aktivitet foregår på vores Discord server —
                spørgsmål, ansøgninger og alle beskeder om serveren samles der.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="https://discord.gg/BHev4WJf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  Besøg vores Discord
                </Button>
              </a>
              <Link to="/ansog" className="sm:hidden lg:block">
                <Button size="lg" className="w-full sm:w-auto">
                  Søg om optagelse
                </Button>
              </Link>
            </div>
          </div>
          <p className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            Regler, vilkår og vores privatlivspolitik finder du i sidefoden på
            alle sider.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
