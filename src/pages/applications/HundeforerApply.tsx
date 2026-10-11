import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const HundeforerApply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    discordUsername: "",
    age: "",
    experience: "",
    motivation: "",
    animalExperience: "",
    availability: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-hundeforer-application', {
        body: formData
      });

      if (!error) {
        toast({
          title: "Ansøgning sendt!",
          description: "Din ansøgning til Hundefører er blevet sendt. Vi vender tilbage til dig snarest.",
        });
        setFormData({
          name: "",
          discordUsername: "",
          age: "",
          experience: "",
          motivation: "",
          animalExperience: "",
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
          <Link to="/enheder/hundeforer">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til Hundefører
            </Button>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-emergency-yellow text-emergency-yellow-foreground">
            K9 - ANSØGNING
          </Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold uppercase tracking-wide leading-none text-foreground mb-5">
            Ansøg til Hundefører
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Udfyld formularen nedenfor for at ansøge om at blive Hundefører. 
            Vi ser frem til at høre om din passion for at arbejde med hunde.
          </p>
        </header>

        {/* Application Form */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
              
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
                <Label htmlFor="motivation">Hvorfor vil du være Hundefører? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  placeholder="Fortæl os om din motivation og interesse for K9-arbejde..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="animalExperience">Erfaring med dyr *</Label>
                <Textarea
                  id="animalExperience"
                  name="animalExperience"
                  value={formData.animalExperience}
                  onChange={handleChange}
                  required
                  placeholder="Beskriv din erfaring med dyr, hundetræning eller lignende..."
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
                  className="text-lg px-12"
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

export default HundeforerApply;