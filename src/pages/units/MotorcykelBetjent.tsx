import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bike, Car, AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MotorcykelBetjent = () => {
  const responsibilities = [
    {
      icon: Car,
      title: "Trafikkontrol",
      description: "Specialiseret i trafikovervågning og håndhævelse af færdselsregler"
    },
    {
      icon: Bike,
      title: "Hurtig Respons",
      description: "Første responder ved trafikuheld og akutte trafiksituationer"
    },
    {
      icon: AlertCircle,
      title: "Eskorte Opgaver",
      description: "Sikrer sikker passage for VIP transport og særlige konvojer"
    }
  ];

  const requirements = [
    "Minimum 1-2 ugers erfaring som politiassistent",
    "Gyldigt motorcykelkørekort (A-kategori)",
    "Gennemført politiets motorcykelkursus",
    "Fremragende kørselserfaring",
    "Fysisk form til motorcykelkørsel i alle vejrforhold"
  ];

  const equipment = [
    "Specialudstyret politimotorcykel",
    "Beskyttelsesudstyr og sikkerhedsgear",
    "Fartkontroludstyr og måleapparatur",
    "Kommunikationsudstyr til koordinering"
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
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-accent text-accent-foreground">
            MIKE
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Motorcykel Betjent
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Som Motorcykel Betjent er du specialist i trafiklovgivning og hurtig respons. 
            Du sikrer trafiksikkerheden og reagerer hurtigt på trafikuheld og nødsituationer.
          </p>
        </div>

        {/* Responsibilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Ansvarsområder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {responsibilities.map((resp, index) => (
              <Card key={index} className="hover:transition-colors">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
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
                <Bike className="w-6 h-6 mr-3 text-primary" />
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
                <Car className="w-6 h-6 mr-3 text-accent" />
                Specialudstyr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {equipment.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
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
              <h3 className="text-2xl font-bold mb-4">Interesseret i at blive Motorcykel Betjent?</h3>
              <p className="text-lg mb-6 opacity-95">
                Bliv specialist i trafiksikkerhed og hurtig respons
              </p>
              <Link to="/ansog/motorcykel-betjent">
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

export default MotorcykelBetjent;