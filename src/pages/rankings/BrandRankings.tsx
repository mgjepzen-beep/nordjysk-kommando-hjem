import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Star } from "lucide-react";

const BrandRankings = () => {
  const brandRanks = [
    {
      rank: "Brandinspektør",
      description: "Øverste ledelse af brandvæsenet",
      stars: 5,
      color: "emergency-red"
    },
    {
      rank: "Brandmester",
      description: "Leder af brandstation og større operationer",
      stars: 4,
      color: "emergency-red"
    },
    {
      rank: "Overbrandmand",
      description: "Erfaren brandmand med lederansvar",
      stars: 3,
      color: "emergency-yellow"
    },
    {
      rank: "Brandmand",
      description: "Professionel brandbekæmper",
      stars: 2,
      color: "secondary"
    },
    {
      rank: "Brandkadet",
      description: "Nyuddannet brandmand under oplæring",
      stars: 1,
      color: "muted"
    }
  ];

  const brandUnits = [
    {
      name: "Redningsleder",
      description: "Leder af store redningsmissioner og koordinerer enheder",
      badge: "RESCUE",
      color: "emergency-red"
    },
    {
      name: "Kemisk Beredskab",
      description: "Specialist i håndtering af farlige kemikalier",
      badge: "HAZMAT",
      color: "emergency-yellow"
    },
    {
      name: "Højderedning",
      description: "Specialist i redning fra højde og svært tilgængelige steder",
      badge: "HEIGHT",
      color: "accent"
    },
    {
      name: "Dykkertjeneste",
      description: "Vandredning og undervands operationer",
      badge: "DIVE",
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
            Brand Rangorden
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vores brandvæsens rangsystem sikrer professionel brandbekæmpelse og redningsindsats 
            med klare ansvarsområder og specialiserede enheder.
          </p>
        </div>

        {/* Brand Ranks */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Brand Rangorden
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandRanks.map((rank, index) => (
              <Card key={index} className="hover:transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emergency-red to-emergency-yellow rounded-full flex items-center justify-center mb-4">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-2">{rank.rank}</CardTitle>
                    <div className="flex items-center">
                      {[...Array(rank.stars)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            rank.color === 'emergency-red' ? 'text-emergency-red fill-emergency-red' :
                            rank.color === 'emergency-yellow' ? 'text-emergency-yellow fill-emergency-yellow' :
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
        <div className="bg-muted/60 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Specialenheder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brandUnits.map((unit, index) => (
              <Card key={index} className="text-center hover:transition-colors">
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
          <Card className="bg-gradient-to-br from-emergency-red to-emergency-yellow text-white">
            <CardContent className="p-8 text-center">
              <Flame className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Brandvæsenets Mission</h3>
              <p className="text-lg leading-relaxed opacity-95">
                At beskytte liv, ejendom og miljø gennem professionel brandbekæmpelse, redning og forebyggelse. 
                Vores team er trænet til at håndtere alle former for nødsituationer med hurtig respons og ekspertise.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrandRankings;