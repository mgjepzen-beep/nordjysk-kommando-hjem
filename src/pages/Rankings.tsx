import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Star } from "lucide-react";
import rankingsImage from "@/assets/rankings.png";

const Rankings = () => {
  const policeRanks = [
    {
      rank: "Rigspolitichef",
      description: "Øverste ledelse af politiet",
      stars: 5,
      color: "primary"
    },
    {
      rank: "Politidirektør",
      description: "Leder af store politikredse",
      stars: 4,
      color: "primary"
    },
    {
      rank: "Chefpolitiinspektør",
      description: "Afdelingsleder og koordinator",
      stars: 4,
      color: "accent"
    },
    {
      rank: "Politiinspektør",
      description: "Leder af mindre enheder og specialafdelinger",
      stars: 3,
      color: "accent"
    },
    {
      rank: "Vicepolitiinspektør",
      description: "Assisterende leder og erfaren officer",
      stars: 3,
      color: "secondary"
    },
    {
      rank: "Politikommissær",
      description: "Erfaren officer med lederansvar",
      stars: 2,
      color: "secondary"
    },
    {
      rank: "Politiassistent",
      description: "Standard betjent med erfaring",
      stars: 1,
      color: "muted"
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
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
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

        {/* Rankings Image */}
        <div className="mb-16 flex justify-center">
          <div className="bg-card rounded-2xl p-8 shadow-professional">
            <img 
              src={rankingsImage} 
              alt="Politi Rangorden" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
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
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rank.rank}</CardTitle>
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
                <CardContent>
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
            {specialUnits.map((unit, index) => (
              <Card key={index} className="border-none shadow-professional text-center">
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
            ))}
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