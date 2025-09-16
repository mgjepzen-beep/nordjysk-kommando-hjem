import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import rankingsImage from "@/assets/rankings.png";
import politiBackground from "@/assets/politi-background.png";

// Import rank images
import rigspolitichefImg from "@/assets/ranks/rigspolitichef.png";
import direktorImg from "@/assets/ranks/direktr.png";
import politimesterImg from "@/assets/ranks/politimester.png";
import politimester2Img from "@/assets/ranks/politimester2.png";
import chefinspektorImg from "@/assets/ranks/chefinspektr.png";
import inspektorImg from "@/assets/ranks/inspektr.png";
import kommissarImg from "@/assets/ranks/kommissr.png";
import betjent1Img from "@/assets/ranks/betjent1.png";
import assistentAf1GradImg from "@/assets/ranks/assistent_af_1_grad.png";
import assistentImg from "@/assets/ranks/assistent.png";
import assistent2Img from "@/assets/ranks/assistent2.png";
import kadetImg from "@/assets/ranks/kadet.png";

const Rankings = () => {
  const policeRanks = [
    {
      rank: "Rigspolitichef",
      description: "Øverste ledelse af politiet",
      stars: 5,
      color: "primary",
      image: rigspolitichefImg
    },
    {
      rank: "Politidirektør",
      description: "Leder af store politikredse",
      stars: 5,
      color: "primary",
      image: direktorImg
    },
    {
      rank: "Politimester",
      description: "Øverste leder af politikreds",
      stars: 4,
      color: "primary",
      image: politimester2Img
    },
    {
      rank: "Chefpolitiinspektør",
      description: "Afdelingsleder og koordinator",
      stars: 4,
      color: "accent",
      image: chefinspektorImg
    },
    {
      rank: "Politiinspektør",
      description: "Leder af mindre enheder og specialafdelinger",
      stars: 3,
      color: "accent",
      image: inspektorImg
    },
    {
      rank: "Vicepolitiinspektør",
      description: "Assisterende leder og erfaren officer",
      stars: 3,
      color: "secondary",
      image: inspektorImg
    },
    {
      rank: "Politikommissær",
      description: "Erfaren officer med lederansvar",
      stars: 2,
      color: "secondary",
      image: kommissarImg
    },
    {
      rank: "Politiassistent af 1. grad",
      description: "Erfaren betjent med specialiseret uddannelse",
      stars: 2,
      color: "secondary",
      image: assistentAf1GradImg
    },
    {
      rank: "Politiassistent",
      description: "Standard betjent med erfaring",
      stars: 1,
      color: "muted",
      image: assistent2Img
    },
    {
      rank: "Politibetjent",
      description: "Grunduddannet betjent",
      stars: 1,
      color: "muted",
      image: betjent1Img
    },
    {
      rank: "Politikadet",
      description: "Politielev under uddannelse",
      stars: 1,
      color: "muted",
      image: kadetImg
    }
  ];

  const specialUnits = [
    {
      name: "Indsatsleder",
      description: "Leder af større operationer og koordinerer enheder",
      badge: "INDSATS",
      color: "emergency-red"
    },
    {
      name: "Hundefører",
      description: "Specialist med politihund til sporing og narkotika",
      badge: "K9",
      color: "emergency-yellow"
    },
    {
      name: "Motorcykel Betjent",
      description: "Trafikspecialist på motorcykel",
      badge: "MIKE",
      color: "accent"
    },
    {
      name: "Reaktions patruljen",
      description: "Hurtig respons enhed til akutte situationer",
      badge: "ROMEO",
      color: "emergency-red"
    },
    {
      name: "Civil Patruljen",
      description: "Undercover operationer og diskret overvågning",
      badge: "CHARLIE",
      color: "secondary"
    },
    {
      name: "Aktions Styrken",
      description: "Elite enhed til højrisiko operationer",
      badge: "AKS",
      color: "primary"
    }
  ];

  return (
    <div 
      className="min-h-screen py-20 relative"
      style={{
        backgroundImage: `url(${politiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-background/15 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            RANGORDEN & HIERARKI
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Politi Rangorden
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vores rangsystem er baseret på det danske politis officielle hierarki og 
            sikrer professionel ledelse og klare ansvarsområder.
          </p>
        </div>

        {/* Police Ranks */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Politi Rangorden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policeRanks.map((rank, index) => (
              <Card key={index} className="border-none shadow-professional hover:shadow-emergency transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <img 
                      src={rank.image} 
                      alt={`${rank.rank} emblem`}
                      className="w-16 h-16 object-contain mb-4"
                    />
                    <CardTitle className="text-lg mb-2">{rank.rank}</CardTitle>
                    <div className="flex items-center">
                      {[...Array(rank.stars)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            rank.color === 'primary' ? 'text-primary fill-primary' :
                            rank.color === 'accent' ? 'text-accent-foreground fill-accent' :
                            rank.color === 'secondary' ? 'text-secondary-foreground fill-secondary' :
                            'text-muted-foreground fill-muted'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {rank.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Units */}
        <div className="bg-card/50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Specialenheder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialUnits.map((unit, index) => {
              const unitRoutes = {
                "Indsatsleder": "/enheder/indsatsleder",
                "Hundefører": "/enheder/hundeforer",
                "Motorcykel Betjent": "/enheder/motorcykel-betjent",
                "Reaktions patruljen": "/enheder/reaktions-patruljen",
                "Civil Patruljen": "/enheder/civil-patruljen",
                "Aktions Styrken": "/enheder/aktions-styrken"
              };
              
              return (
                <Link key={index} to={unitRoutes[unit.name]} className="block">
                  <Card className="border-none shadow-professional text-center hover:shadow-emergency transition-all duration-300 cursor-pointer hover-scale">
                    <CardContent className="pt-8 pb-8">
                      <div className="mb-6">
                        <Badge 
                          variant="secondary"
                         className={`text-lg px-4 py-2 ${
                            unit.color === 'emergency-red' ? 'bg-emergency-red text-emergency-red-foreground' :
                            unit.color === 'emergency-yellow' ? 'bg-emergency-yellow text-emergency-yellow-foreground' :
                            'bg-accent text-accent-foreground'
                          }`}
                        >
                          {unit.badge}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-4">{unit.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">{unit.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-16">
          <Card className="border-none shadow-emergency bg-gradient-hero text-primary-foreground">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Forfremmelse System</h3>
              <p className="text-lg leading-relaxed opacity-95">
                Forfremmelser er baseret på erfaring, dedikation, lederegenskaber og bidrag til communityet. 
                Alle medlemmer har mulighed for at avancere gennem rankerne ved at vise professionalisme 
                og engagement i deres rolle.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rankings;