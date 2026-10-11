import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ReaktionsPatruljen = () => {
  const responsibilities = [
    {
      icon: Zap,
      title: "Hurtig Respons",
      description: "Første på stedet ved akutte nødsituationer og højprioritetskald"
    },
    {
      icon: Clock,
      title: "Døgnberedskab",
      description: "Patruljerer strategiske områder og reagerer øjeblikkeligt på alarmer"
    },
    {
      icon: Shield,
      title: "Sikkerhedsindsats",
      description: "Håndterer farlige situationer og yder støtte til andre enheder"
    }
  ];

  const requirements = [
    "Minimum 1-2 ugers erfaring som politiassistent",
    "Fremragende kørselserfaring og reaktionstid",
    "Fysisk form til intensive operationer",
    "Evne til at arbejde under højt pres",
    "Gennemført reaktionspolitikursus"
  ];

  const equipment = [
    "Højhastighedspatruljekøretøjer",
    "Taktisk udstyr og beskyttelse",
    "Avanceret kommunikationssystem",
    "Førstehjælpsudstyr og nødudstyr"
  ];

  return (
    <div className="min-h-screen py-20">
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
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-emergency-red text-emergency-red-foreground">
            ROMEO
          </Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold uppercase tracking-wide leading-none text-foreground mb-5">
            Reaktions Patruljen
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Som medlem af Reaktions Patruljen er du en del af vores hurtige respons enhed. 
            Du reagerer øjeblikkeligt på akutte situationer og sikrer hurtig indsats når det virkelig gælder.
          </p>
        </div>

        {/* Responsibilities */}
        <section className="mb-16">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-foreground mb-8">
            Ansvarsområder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {responsibilities.map((resp, index) => (
              <Card key={index} className="">
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
                <Zap className="w-6 h-6 mr-3 text-emergency-red" />
                Specialudstyr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {equipment.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-emergency-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-4">Interesseret i at blive del af Reaktions Patruljen?</h3>
              <p className="text-lg mb-6 opacity-95">
                Bliv en del af vores elite hurtige respons enhed
              </p>
              <Link to="/ansog/reaktions-patruljen">
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

export default ReaktionsPatruljen;