import { Shield, Users, Award, Target } from "lucide-react";
import ambulanceScene from "@/assets/ambulance-scene.png";
import fireScene from "@/assets/fire-scene.png";
import policeScene from "@/assets/police-scene.png";
import emergencyResponse from "@/assets/emergency-response.png";

const About = () => {
  const services = [
    {
      title: "Politi Tjeneste",
      label: "Politi",
      description: "Professionel håndhævelse af loven med fokus på community policing og retfærdighed.",
      image: policeScene,
    },
    {
      title: "Brandvæsen",
      label: "Brand",
      description: "Hurtig respons på brand og redningsoperationer med moderne udstyr og træning.",
      image: fireScene,
    },
    {
      title: "Ambulance Tjeneste",
      label: "Ambulance",
      description: "Livreddende medicinsk bistand og hurtig transport til hospitalerne.",
      image: ambulanceScene,
    },
    {
      title: "Samlet Indsats",
      label: "Samarbejde",
      description: "Koordineret emergency response, hvor alle enheder arbejder sammen om borgernes sikkerhed.",
      image: emergencyResponse,
    },
  ];

  const aboutPoints = [
    {
      icon: Shield,
      title: "Professionalisme",
      description: "Vi følger realistiske procedurer og protokoller i alle situationer.",
    },
    {
      icon: Users,
      title: "Fællesskab",
      description: "Et stærkt community, hvor alle medlemmer støtter hinanden.",
    },
    {
      icon: Award,
      title: "Træning",
      description: "Kontinuerlig uddannelse og forbedring af vores færdigheder.",
    },
    {
      icon: Target,
      title: "Mission",
      description: "At skabe den mest realistiske emergency services oplevelse i FiveM.",
    },
  ];

  return (
    <div className="container py-16 lg:py-24">
      {/* Header */}
      <header className="max-w-3xl mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Om Projekt Blå Blink
        </p>
        <h1 className="font-display text-5xl lg:text-6xl font-semibold uppercase tracking-wide leading-none mb-6">
          Hvem er vi?
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          PROJEKT BLÅ BLINK er et emergency services community. Vi er dedikeret
          til at levere en autentisk og professionel roleplay oplevelse med
          fokus på realisme, teamwork og respekt for hinanden.
        </p>
      </header>

      {/* Services */}
      <section className="mb-20">
        <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-8">
          Tjenesterne
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="border border-border bg-card overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="h-52 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                  {service.label}
                </p>
                <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About points */}
      <section className="mb-20">
        <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-8">
          Hvad gør os specielle?
        </h2>
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {aboutPoints.map((point) => (
            <div key={point.title} className="flex items-start gap-4">
              <point.icon className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="border-l-4 border-primary pl-6 lg:pl-8 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-wide mb-4">
          Vores mission
        </h2>
        <blockquote className="text-lg text-muted-foreground leading-relaxed">
          "At skabe det mest realistiske og professionelle emergency services
          community, hvor hvert medlem kan udvikle deres færdigheder, bygge
          meningsfulde relationer og bidrage til en positiv gaming oplevelse
          for alle."
        </blockquote>
      </section>
    </div>
  );
};

export default About;
