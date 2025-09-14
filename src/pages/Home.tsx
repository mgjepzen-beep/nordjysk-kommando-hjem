import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Trophy, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import heroBackground from "@/assets/hero-background.png";

const Home = () => {
  const values = [
    {
      icon: Shield,
      title: "Integritet",
      description: "Vi handler med høj moral og ærlighed i alle situationer"
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Sammen er vi stærkere - vi støtter hinanden gennem alt"
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "Vi stræber altid efter at levere den bedste service"
    }
  ];

  const stats = [
    { number: "15", label: "Aktive Medlemmer", color: "primary" },
    { number: "24/7", label: "Service", color: "emergency-red" },
    { number: "1", label: "År i Drift", color: "emergency-yellow" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBackground})`,
            opacity: 0.7
          }}
        ></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-12">
              <img 
                src={logo} 
                alt="NORDJYSK FIVEPD Logo" 
                className="h-28 w-28 lg:h-36 lg:w-36 object-contain drop-shadow-2xl"
              />
            </div>
            <Badge variant="secondary" className="mb-8 px-6 py-3 text-sm font-medium">
              OFFICIEL NORDJYLLANDS EMERGENCY SERVICES
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
              NORDJYSK
              <span className="text-primary block lg:inline lg:ml-4">FIVEPD</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/95 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              Nordjyllands førende emergency services community. Vi tilbyder professionel politi, 
              brandvæsen og ambulance tjeneste i en realistisk FiveM miljø.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/ansog">
                <Button size="lg" className="bg-gradient-hero shadow-professional text-lg px-10 py-4">
                  <Shield className="w-5 h-5 mr-2" />
                  Bliv en del af teamet
                </Button>
              </Link>
              <Link to="/om-os">
                <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm hover-scale">
                  <Users className="w-6 h-6 mr-3" />
                  <span className="flex flex-col items-start">
                    <span className="font-semibold">Lær mere om os</span>
                    <span className="text-sm opacity-90">Vores mission & værdier</span>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-professional">
                <CardContent className="pt-8 pb-8">
                  <div className={`text-4xl lg:text-5xl font-bold mb-2 ${
                    stat.color === 'primary' ? 'text-primary' :
                    stat.color === 'emergency-red' ? 'text-emergency-red' :
                    'text-emergency-yellow'
                  }`}>
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Vores Værdier
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Disse grundlæggende principper guider vores arbejde og samarbejde hver dag
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-professional hover:shadow-emergency transition-all duration-300">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="bg-gradient-hero w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Kontakt Os
            </h2>
            <p className="text-xl text-muted-foreground">
              Vi er her for at hjælpe dig med at komme i gang
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card 
              className="border-none shadow-professional text-center hover:shadow-emergency transition-all duration-300 cursor-pointer hover-scale"
              onClick={() => window.open('https://discord.gg/BHev4WJf', '_blank')}
            >
              <CardContent className="pt-6 pb-6">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Discord Server</h3>
                <p className="text-muted-foreground text-sm">Tilslut dig vores community</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-professional text-center">
              <CardContent className="pt-6 pb-6">
                <MapPin className="w-8 h-8 text-emergency-red mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">FiveM Server</h3>
                <p className="text-muted-foreground text-sm">Join vores in-game server</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-professional text-center">
              <CardContent className="pt-6 pb-6">
                <Clock className="w-8 h-8 text-emergency-yellow mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">24/7 Support</h3>
                <p className="text-muted-foreground text-sm">Vi er altid her for dig</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link to="/ansog">
              <Button size="lg" className="bg-gradient-emergency shadow-emergency text-lg px-8">
                Start Din Ansøgning
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;