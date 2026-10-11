import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Shield, Users, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AktionStyrken = () => {
  const responsibilities = [
    {
      icon: Target,
      title: "Højrisiko Operationer",
      description: "Håndterer de mest farlige og komplekse politioperationer"
    },
    {
      icon: Shield,
      title: "Specialindsats",
      description: "Elite enhed til terrorbekæmpelse og organiseret kriminalitet"
    },
    {
      icon: Users,
      title: "Teamarbejde",
      description: "Arbejder som en sammenhængende elite enhed med maksimal effektivitet"
    }
  ];

  const requirements = [
    "Minimum 1-2 ugers erfaring som politiassistent",
    "Fremragende fysisk form og kondition",
    "Gennemført elitekampkursus og taktisk træning",
    "Psykologisk evaluering og godkendelse",
    "Demonstreret lederskap og teamwork",
    "Specialistfærdigheder inden for våben og taktik"
  ];

  const equipment = [
    "Avanceret taktisk udstyr og beskyttelse",
    "Specialiserede våben og ammunitioner",
    "Beskyttelsesveste og hjælme",
    "Kommunikationsudstyr og koordineringstools",
    "Køretøjer tilpasset højrisiko missioner"
  ];

  return (
    <div className="container px-4 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/rangorden">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til Rangorden
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">AKS</p>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold uppercase tracking-wide leading-none text-foreground mb-5">
            Aktions Styrken
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Som medlem af Aktions Styrken er du en del af vores elite enhed. 
            Du håndterer de mest kritiske og farlige situationer med præcision og professionalisme.
          </p>
        </div>

        {/* Responsibilities */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-foreground mb-8">
            Ansvarsområder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {responsibilities.map((resp, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <resp.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{resp.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{resp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Requirements & Equipment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Requirements */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                
                Krav til Stillingen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Equipment */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                
                Specialudstyr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {equipment.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-card">
            <CardContent className="p-8">
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-4">Interesseret i at blive del af Aktions Styrken?</h3>
              <p className="text-lg mb-6 opacity-95">
                Bliv en del af vores absolutte elite enhed
              </p>
              <Link to="/ansog/aktions-styrken">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Ansøg Nu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AktionStyrken;