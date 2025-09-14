import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Users, 
  Clock, 
  FileText, 
  Mic, 
  Shield,
  AlertTriangle,
  Heart,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Recruiting = () => {
  const requirements = [
    {
      icon: Users,
      title: "Alder",
      description: "Minimum 16 år gammel",
      type: "essential"
    },
    {
      icon: Mic,
      title: "Kommunikation",
      description: "Godt dansk og arbejdende mikrofon",
      type: "essential"
    },
    {
      icon: Clock,
      title: "Aktivitet",
      description: "Når du lige har mulighed for det",
      type: "essential"
    },
    {
      icon: Shield,
      title: "Attitude",
      description: "Professionel og respektfuld adfærd",
      type: "essential"
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "Passion for roleplay og teamwork",
      type: "preferred"
    },
    {
      icon: Zap,
      title: "Erfaring",
      description: "FiveM/roleplay erfaring er en fordel",
      type: "preferred"
    }
  ];

  const applicationSteps = [
    {
      step: 1,
      title: "Discord Ansøgning",
      description: "Udfyld vores ansøgningsformular på Discord serveren",
      timeframe: "5-10 minutter"
    },
    {
      step: 2,
      title: "Baggrundstjek",
      description: "Vi gennemgår din ansøgning og tjekker referencer",
      timeframe: "24-48 timer"
    },
    {
      step: 3,
      title: "Interview",
      description: "Samtale med rekrutteringsteamet",
      timeframe: "30-45 minutter"
    },
    {
      step: 4,
      title: "Prøvetid",
      description: "2 ugers prøveperiode med tæt supervision",
      timeframe: "14 dage"
    },
    {
      step: 5,
      title: "Fuld Medlemsskab",
      description: "Velkommen til teamet som fuldgyldigt medlem",
      timeframe: "Permanent"
    }
  ];

  const positions = [
    {
      title: "Politibetjent",
      description: "Frontline politi arbejde med patruljer, trafikstop og efterforskning",
      urgency: "high",
      icon: Shield,
      applicationPath: "/ansog?position=police"
    },
    {
      title: "Brandmand",
      description: "Brand og redningsoperationer med specialiseret udstyr",
      urgency: "medium",
      icon: AlertTriangle,
      applicationPath: "/ansog?position=fire"
    },
    {
      title: "Paramediciner",
      description: "Medicinsk behandling og hurtig respons til nødsituationer",
      urgency: "high",
      icon: Heart,
      applicationPath: "/ansog?position=ems"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            BLIV EN DEL AF TEAMET
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Rekruttering
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vi søger dedikerede individer der ønsker at være en del af Nordjyllands 
            mest professionelle emergency services community.
          </p>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Åbne Stillinger
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <Card key={index} className="border-none shadow-professional hover:shadow-emergency transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center">
                    <position.icon className={`w-8 h-8 ${
                      position.urgency === 'high' ? 'text-emergency-red' : 'text-primary'
                    }`} />
                  </div>
                  <CardTitle className="text-xl">{position.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {position.description}
                  </p>
                  <Link to={position.applicationPath}>
                    <Button 
                      variant="outline" 
                      className={`w-full ${
                        position.urgency === 'high' ? 'border-emergency-red text-emergency-red hover:bg-emergency-red hover:text-emergency-red-foreground' : ''
                      }`}
                    >
                      Ansøg Nu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-16 bg-card/50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Krav & Forventninger
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requirements.map((req, index) => (
              <Card key={index} className={`border-none shadow-professional ${
                req.type === 'essential' ? 'ring-2 ring-primary/20' : ''
              }`}>
                <CardContent className="pt-6 pb-6 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    req.type === 'essential' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                  }`}>
                    <req.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{req.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{req.description}</p>
                  {req.type === 'essential' && (
                    <Badge variant="destructive" className="mt-3 text-xs">
                      PÅKRÆVET
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Ansøgningsprocessen
          </h2>
          <div className="space-y-6">
            {applicationSteps.map((step, index) => (
              <Card key={index} className="border-none shadow-professional">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-hero w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                        <Badge variant="secondary">{step.timeframe}</Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="border-none shadow-emergency bg-gradient-emergency text-primary-foreground max-w-2xl mx-auto">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Klar til at Starte?
              </h2>
              <p className="text-lg mb-6 opacity-95 leading-relaxed">
                Bliv en del af vores professionelle team og gør en forskel i communityet. 
                Din rejse starter her!
              </p>
              <Link to="/ansog">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 text-lg px-8"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Start Din Ansøgning
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recruiting;