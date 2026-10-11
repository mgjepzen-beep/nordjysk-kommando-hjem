import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, UserX, Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CivilPatruljen = () => {
  const responsibilities = [
    {
      icon: Eye,
      title: "Diskret Overvågning",
      description: "Udfører skjult overvågning af mistænkte personer og aktiviteter"
    },
    {
      icon: UserX,
      title: "Undercover Operationer",
      description: "Infiltrerer kriminelle netværk og indsamler intelligence"
    },
    {
      icon: Search,
      title: "Efterforskning",
      description: "Indsamler beviser og informationer til komplekse sager"
    }
  ];

  const requirements = [
    "Minimum 1-2 ugers erfaring som politiassistent",
    "Gennemført specialkursus i efterforskning",
    "Evne til at arbejde selvstændigt og diskret",
    "Stærke observationsevner",
    "Psykologisk egnethed til undercover arbejde"
  ];

  const equipment = [
    "Civile køretøjer uden politimarkering",
    "Skjult overvågningsudstyr",
    "Kommunikationsudstyr til diskret kontakt",
    "Diverse forklædninger og identiteter"
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">CHARLIE</p>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold uppercase tracking-wide leading-none text-foreground mb-5">
            Civil Patruljen
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Som medlem af Civil Patruljen arbejder du i det skjulte med efterforskning og overvågning. 
            Du er en usynlig beskytter af samfundet og indsamler vital intelligence.
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
                <UserX className="w-6 h-6 mr-3 text-secondary" />
                Specialudstyr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {equipment.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-4">Interesseret i at blive del af Civil Patruljen?</h3>
              <p className="text-lg mb-6 opacity-95">
                Bliv en usynlig beskytter og elite efterforsker
              </p>
              <Link to="/ansog/civil-patruljen">
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

export default CivilPatruljen;