import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AktionApply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    discordUsername: "",
    age: "",
    experience: "",
    motivation: "",
    specialSkills: "",
    availability: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/functions/v1/submit-aktion-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Ansøgning sendt!",
          description: "Din ansøgning til Aktions Styrken er blevet sendt. Vi vender tilbage til dig snarest.",
        });
        setFormData({
          name: "",
          discordUsername: "",
          age: "",
          experience: "",
          motivation: "",
          specialSkills: "",
          availability: ""
        });
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved afsendelse af din ansøgning. Prøv igen senere.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/enheder/aktions-styrken">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til Aktions Styrken
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-primary text-primary-foreground">
            AKS - ANSØGNING
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ansøg til Aktions Styrken
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Udfyld formularen nedenfor for at ansøge om at blive del af vores elite Aktions Styrke. 
            Dette er vores mest krævende position og kræver exceptionelle kvalifikationer.
          </p>
        </div>

        {/* Application Form */}
        <Card className="border-none shadow-professional">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center">
              <Target className="w-6 h-6 mr-3 text-primary" />
              Ansøgningsformular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Fulde Navn *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Dit fulde navn"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discordUsername">Discord Brugernavn *</Label>
                  <Input
                    id="discordUsername"
                    name="discordUsername"
                    value={formData.discordUsername}
                    onChange={handleChange}
                    required
                    placeholder="@brugernavn"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Alder *</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    placeholder="Din alder"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Erfaring som Politiassistent *</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    placeholder="Beskriv din erfaring kort"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Hvorfor vil du være del af Aktions Styrken? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  placeholder="Fortæl os om din motivation og hvorfor du mener du hører til i vores elite enhed..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialSkills">Særlige færdigheder og kvalifikationer *</Label>
                <Textarea
                  id="specialSkills"
                  name="specialSkills"
                  value={formData.specialSkills}
                  onChange={handleChange}
                  required
                  placeholder="Beskriv dine særlige færdigheder, taktisk erfaring, lederevner og alt hvad der gør dig egnet til elite opgaver..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Tilgængelighed *</Label>
                <Textarea
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  placeholder="Hvornår er du tilgængelig? (dage, tidspunkter, etc.)"
                  rows={3}
                />
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="bg-gradient-hero shadow-emergency text-lg px-12"
                >
                  {isSubmitting ? (
                    "Sender..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Ansøgning
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AktionApply;