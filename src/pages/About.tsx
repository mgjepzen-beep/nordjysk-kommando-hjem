import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Award, Target } from "lucide-react";
import ambulanceScene from "@/assets/ambulance-scene.png";
import fireScene from "@/assets/fire-scene.png";
import policeScene from "@/assets/police-scene.png";
import emergencyResponse from "@/assets/emergency-response.png";

const About = () => {
  const services = [
    {
      title: "Politi Tjeneste",
      description: "Professionel håndhævelse af loven med fokus på community policing og retfærdighed",
      image: policeScene,
      badge: "POLITI",
      color: "primary"
    },
    {
      title: "Brandvæsen",
      description: "Hurtig respons på brand og redningsoperationer med moderne udstyr og træning",
      image: fireScene,
      badge: "BRAND",
      color: "emergency-red"
    },
    {
      title: "Ambulance Tjeneste",
      description: "Livreddende medicinsk bistand og hurtig transport til hospitalerne",
      image: ambulanceScene,
      badge: "AMBULANCE",
      color: "emergency-yellow"
    },
    {
      title: "Samlet Indsats",
      description: "Koordineret emergency response med alle enheder arbejder sammen om borgernes sikkerhed",
      image: emergencyResponse,
      badge: "EMERGENCY",
      color: "accent"
    }
  ];

  const aboutPoints = [
    {
      icon: Shield,
      title: "Professionalisme",
      description: "Vi følger realistiske procedurer og protokoller i alle situationer"
    },
    {
      icon: Users,
      title: "Fællesskab",
      description: "Et stærkt community hvor alle medlemmer støtter hinanden"
    },
    {
      icon: Award,
      title: "Træning",
      description: "Kontinuerlig uddannelse og forbedring af vores færdigheder"
    },
    {
      icon: Target,
      title: "Mission",
      description: "At skabe den mest realistiske emergency services oplevelse i FiveM"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            OM PROJEKT BLÅ BLINK
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Hvem Er Vi?
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            PROJEKT BLÅ BLINK er et emergency services community. Vi er dedikeret til at 
            levere en autentisk og professionel roleplay oplevelse med fokus på realisme, teamwork og 
            respekt for hinanden.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-professional hover:shadow-emergency transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      service.color === 'primary' ? 'bg-primary text-primary-foreground' :
                      service.color === 'emergency-red' ? 'bg-emergency-red text-emergency-red-foreground' :
                      service.color === 'emergency-yellow' ? 'bg-emergency-yellow text-emergency-yellow-foreground' :
                      'bg-accent text-accent-foreground'
                    }`}
                  >
                    {service.badge}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Points */}
        <div className="bg-card/50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Hvad Gør Os Specielle?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vi er mere end bare en gaming community - vi er en familie dedikeret til excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutPoints.map((point, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-hero w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mt-20">
          <Card className="border-none shadow-emergency bg-gradient-hero text-primary-foreground max-w-4xl mx-auto">
            <CardContent className="p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">Vores Mission</h2>
              <p className="text-lg lg:text-xl leading-relaxed opacity-95">
                "At skabe det mest realistiske og professionelle emergency services community, 
                hvor hvert medlem kan udvikle deres færdigheder, bygge meningsfulde relationer og 
                bidrage til en positiv gaming oplevelse for alle."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;