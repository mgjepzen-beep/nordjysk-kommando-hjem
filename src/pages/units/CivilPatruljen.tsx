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
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-secondary text-secondary-foreground">
            CHARLIE
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Civil Patruljen
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Som medlem af Civil Patruljen arbejder du i det skjulte med efterforskning og overvågning. 
            Du er en usynlig beskytter af samfundet og indsamler vital intelligence.
          </p>
        </div>

        {/* Responsibilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Ansvarsområder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {responsibilities.map((resp, index) => (
              <Card key={index} className="border-none shadow-professional hover:shadow-emergency transition-all duration-300">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="bg-gradient-hero w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <resp.icon className="w-8 h-8 text-primary-foreground" />
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
          <Card className="border-none shadow-professional">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <Eye className="w-6 h-6 mr-3 text-primary" />
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
          <Card className="border-none shadow-professional">
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
          <Card className="border-none shadow-emergency bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Interesseret i at blive del af Civil Patruljen?</h3>
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