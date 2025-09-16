import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";

const EmsRankings = () => {
  const emsRanks = [
    {
      rank: "Ledende Overlæge",
      description: "Øverste medicinske ledelse",
      stars: 6,
      color: "primary"
    },
    {
      rank: "Overlæge",
      description: "Specialist læge med ledelsesansvar",
      stars: 5,
      color: "primary"
    },
    {
      rank: "Læge",
      description: "Uddannet læge med medicinsk ansvar",
      stars: 4,
      color: "accent"
    },
    {
      rank: "Paramediciner",
      description: "Avanceret præhospital behandling",
      stars: 3,
      color: "accent"
    },
    {
      rank: "Behandler",
      description: "Erfaren behandler med specialkompetencer",
      stars: 2,
      color: "secondary"
    },
    {
      rank: "Assistent",
      description: "Kvalificeret ambulanceassistent",
      stars: 1,
      color: "secondary"
    },
    {
      rank: "Elev",
      description: "Ambulanceelev under uddannelse",
      stars: 1,
      color: "muted"
    }
  ];

  const emsUnits = [
    {
      name: "Indsatsleder",
      description: "Leder på skadested med overordnet ansvar for medicinske operationer",
      badge: "ISL",
      color: "primary"
    },
    {
      name: "Helicopter Emergency Medical Services",
      description: "Luftambulance med avanceret medicinsk udstyr til hurtig transport",
      badge: "HEMS",
      color: "primary"
    },
    {
      name: "Water Emergency Medical Services",
      description: "Specialiseret vandambulance til maritime redningsoperationer",
      badge: "VEMS",
      color: "accent"
    },
    {
      name: "Tactical Emergency Medical Services",
      description: "Taktisk medicinsk støtte til politiets specialenheder",
      badge: "TEMS",
      color: "secondary"
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
            EMS Rangorden
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vores ambulancetjeneste rangsystem sikrer professionel medicinsk behandling og patient transport 
            med højtrænet personale og specialiserede enheder.
          </p>
        </div>

        {/* EMS Ranks */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            EMS Rangorden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emsRanks.map((rank, index) => (
              <Card key={index} className="border-none shadow-professional hover:shadow-emergency transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-2">{rank.rank}</CardTitle>
                    <div className="flex items-center">
                      {[...Array(rank.stars)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            rank.color === 'primary' ? 'text-primary fill-primary' :
                            rank.color === 'accent' ? 'text-accent fill-accent' :
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {emsUnits.map((unit, index) => (
              <Card key={index} className="border-none shadow-professional text-center hover:shadow-emergency transition-all duration-300">
                <CardContent className="pt-8 pb-8">
                  <div className="mb-6">
                    <Badge 
                      variant="secondary"
                      className={`text-lg px-4 py-2 ${
                        unit.color === 'emergency-red' ? 'bg-emergency-red text-emergency-red-foreground' :
                        unit.color === 'primary' ? 'bg-primary text-primary-foreground' :
                        unit.color === 'accent' ? 'bg-accent text-accent-foreground' :
                        'bg-secondary text-secondary-foreground'
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
          <Card className="border-none shadow-emergency bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <CardContent className="p-8 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">EMS Mission</h3>
              <p className="text-lg leading-relaxed opacity-95">
                At yde hurtig, professionel præhospital behandling og sikker patient transport. 
                Vores team er uddannet til at redde liv og give den bedst mulige medicinske pleje i kritiske situationer.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmsRankings;