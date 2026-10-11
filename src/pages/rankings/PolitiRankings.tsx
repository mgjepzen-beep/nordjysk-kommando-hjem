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
  const policeInsigniaGroups = [
    {
      image: rigspolitichefImg,
      ranks: [
        {
          rank: "Rigspolitichef",
          description: "Øverste ledelse af politiet",
          stars: 5,
          color: "primary"
        }
      ]
    },
    {
      image: direktorImg,
      ranks: [
        {
          rank: "Politidirektør",
          description: "Leder af store politikredse",
          stars: 5,
          color: "primary"
        },
        {
          rank: "Politimester",
          description: "Øverste leder af politikreds",
          stars: 4,
          color: "primary"
        }
      ]
    },
    {
      image: politimester2Img,
      ranks: [
        {
          rank: "Stabschef",
          description: "Stabschef med strategisk ansvar",
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
          rank: "Vicestabschef",
          description: "Vicestabschef med operativt ansvar",
          stars: 3,
          color: "accent"
        }
      ]
    },
    {
      image: chefinspektorImg,
      ranks: [
        {
          rank: "Politiinspektør",
          description: "Leder af mindre enheder og specialafdelinger",
          stars: 3,
          color: "accent"
        }
      ]
    },
    {
      image: inspektorImg,
      ranks: [
        {
          rank: "Vicepolitiinspektør",
          description: "Assisterende leder og erfaren officer",
          stars: 3,
          color: "secondary"
        }
      ]
    },
    {
      image: kommissarImg,
      ranks: [
        {
          rank: "Politikommissær",
          description: "Erfaren officer med lederansvar",
          stars: 2,
          color: "secondary"
        }
      ]
    },
    {
      image: assistentAf1GradImg,
      ranks: [
        {
          rank: "Politiassistent af 1. grad",
          description: "Erfaren betjent med specialiseret uddannelse",
          stars: 2,
          color: "secondary"
        }
      ]
    },
    {
      image: assistent2Img,
      ranks: [
        {
          rank: "Politiassistent",
          description: "Standard betjent med erfaring",
          stars: 1,
          color: "muted"
        }
      ]
    },
    {
      image: betjent1Img,
      ranks: [
        {
          rank: "Politibetjent",
          description: "Grunduddannet betjent",
          stars: 1,
          color: "muted"
        }
      ]
    },
    {
      image: kadetImg,
      ranks: [
        {
          rank: "Politikadet",
          description: "Politielev under uddannelse",
          stars: 1,
          color: "muted"
        }
      ]
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
      className="relative py-16 lg:py-24"
      style={{
        backgroundImage: `url(${politiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-background/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            RANGORDEN & HIERARKI
          </Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold uppercase tracking-wide leading-none text-foreground mb-5">
            Politi Gradstegn
          </h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Vores rangsystem er baseret på det danske politis officielle hierarki og 
            sikrer professionel ledelse og klare ansvarsområder.
          </p>
        </div>

        {/* Police Ranks */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-foreground mb-8">
            Politi Gradstegn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {policeInsigniaGroups.map((group, groupIndex) => (
              <Card key={groupIndex} className="bg-card">
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center mb-4">
                    <img 
                      src={group.image} 
                      alt={`Gradstegn emblem`}
                      className="w-16 h-16 object-contain mb-4"
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  {group.ranks.map((rank, rankIndex) => (
                    <div key={rankIndex} className="border-b border-border last:border-b-0 pb-3 last:pb-0">
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">{rank.rank}</h3>
                        <div className="flex items-center mb-2">
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
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {rank.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Units */}
        <div className="bg-muted/60 rounded-2xl p-8 lg:p-12">
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide text-foreground mb-8">
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
                  <Card className="bg-card text-center  cursor-pointer ">
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
          <Card className="bg-card">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-4">Forfremmelse System</h3>
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