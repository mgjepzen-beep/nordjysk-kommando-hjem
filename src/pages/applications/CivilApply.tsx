import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { civilApplicationSchema, sanitizeInput } from "@/lib/validation";
import { ZodError } from "zod";

const CivilApply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    discordUsername: "",
    age: "",
    experience: "",
    motivation: "",
    discretion: "",
    availability: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setValidationErrors({});

    try {

      // Sanitize input data
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        discordUsername: sanitizeInput(formData.discordUsername),
        age: sanitizeInput(formData.age),
        experience: sanitizeInput(formData.experience),
        motivation: sanitizeInput(formData.motivation),
        discretion: sanitizeInput(formData.discretion),
        availability: sanitizeInput(formData.availability)
      };

      // Validate with Zod schema
      const validatedData = civilApplicationSchema.parse(sanitizedData);

      const { error } = await supabase.functions.invoke('submit-civil-application', {
        body: validatedData
      });

      if (!error) {
        toast({
          title: "Ansøgning sendt!",
          description: "Din ansøgning til Civil Patruljen er blevet sendt. Vi vender tilbage til dig snarest.",
        });
        
        setFormData({
          name: "",
          discordUsername: "",
          age: "",
          experience: "",
          motivation: "",
          discretion: "",
          availability: ""
        });
      } else {
        throw error;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(fieldErrors);
        
        toast({
          title: "Valideringsfejl",
          description: "Kontroller venligst dine indtastninger og prøv igen.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Fejl",
          description: "Der opstod en fejl ved afsendelse af din ansøgning. Prøv igen senere.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    setFormData({
      ...formData,
      [name]: sanitizeInput(value),
    });
  };

  return (
    <div className="container px-4 py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/enheder/civil-patruljen">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage til Civil Patruljen
            </Button>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">CHARLIE - ANSØGNING</p>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold uppercase tracking-wide leading-none text-foreground mb-5">
            Ansøg til Civil Patruljen
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Udfyld formularen nedenfor for at ansøge om at blive del af Civil Patruljen. 
            Vi ser frem til at høre om din evne til diskret arbejde og observation.
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
                <Label htmlFor="motivation">Hvorfor vil du være del af Civil Patruljen? *</Label>
                <Textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  required
                  placeholder="Fortæl os om din motivation og interesse for undercover arbejde..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discretion">Diskret arbejde og observation *</Label>
                <Textarea
                  id="discretion"
                  name="discretion"
                  value={formData.discretion}
                  onChange={handleChange}
                  required
                  placeholder="Beskriv din evne til diskret arbejde, observation og hvorfor du egner dig til undercover opgaver..."
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

export default CivilApply;