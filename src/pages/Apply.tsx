import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { CheckCircle, FileText, User, Mail, Phone, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Apply = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    discord: "",
    phone: "",
    position: "",
    experience: "",
    motivation: "",
    availability: "",
    agreement: false
  });

  // Pre-select position based on URL parameter
  useEffect(() => {
    const positionParam = searchParams.get('position');
    if (positionParam && ['police', 'fire', 'ems'].includes(positionParam)) {
      setFormData(prev => ({ ...prev, position: positionParam }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreement) {
      toast({
        title: "Fejl",
        description: "Du skal acceptere vilkårene for at fortsætte",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-general-application', {
        body: {
          fullName: formData.fullName,
          age: parseInt(formData.age),
          email: formData.email,
          discord: formData.discord,
          phone: formData.phone,
          position: formData.position,
          experience: formData.experience,
          motivation: formData.motivation,
          availability: formData.availability
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Ansøgning Sendt!",
        description: "Din ansøgning er sendt til Discord serveren. Vi vender tilbage til dig inden for 24-48 timer",
      });
      
      // Reset form
      setFormData({
        fullName: "",
        age: "",
        email: "",
        discord: "",
        phone: "",
        position: "",
        experience: "",
        motivation: "",
        availability: "",
        agreement: false
      });
    } catch (error) {
      console.error("Error sending application:", error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved afsendelse af ansøgningen. Prøv igen senere.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const positions = [
    { value: "police", label: "Politibetjent" },
    { value: "fire", label: "Brandmand" },
    { value: "ems", label: "Paramediciner" }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            ANSØGNING
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Bliv En Del Af Teamet
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Udfyld ansøgningsformularen nedenfor for at starte din rejse hos PROJEKT BLÅ BLINK
          </p>
        </div>

        {/* Application Form */}
        <Card className="border-none shadow-professional">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Ansøgningsformular
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personlige Oplysninger
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Fulde Navn *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Dit fulde navn"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Alder *</Label>
                    <Input
                      id="age"
                      type="number"
                      min="16"
                      max="80"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      placeholder="Din alder"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Kontaktoplysninger
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="din@email.dk"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discord">Discord Brugernavn *</Label>
                    <Input
                      id="discord"
                      value={formData.discord}
                      onChange={(e) => setFormData({...formData, discord: e.target.value})}
                      placeholder="brugernavn#1234"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer (valgfri)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+45 12 34 56 78"
                  />
                </div>
              </div>

              {/* Position & Experience */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Stilling & Erfaring
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="position">Ønsket Stilling *</Label>
                  <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg en stilling" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position.value} value={position.value}>
                          {position.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Tidligere Erfaring</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="Beskriv din erfaring med FiveM, roleplay eller lignende..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="motivation">Hvorfor vil du være en del af PROJEKT BLÅ BLINK? *</Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    placeholder="Fortæl os om din motivation og hvad du kan bidrage med..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Tilgængelighed</Label>
                  <Textarea
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({...formData, availability: e.target.value})}
                    placeholder="Hvornår har du tid til at være aktiv? (f.eks. hverdage efter 18:00, weekender...)"
                    rows={3}
                  />
                </div>
              </div>

              {/* Agreement */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreement"
                  checked={formData.agreement}
                  onCheckedChange={(checked) => setFormData({...formData, agreement: checked as boolean})}
                />
                <Label htmlFor="agreement" className="text-sm">
                  Jeg accepterer vilkårene og er indforstået med at mine oplysninger behandles i forbindelse med ansøgningsprocessen *
                </Label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-emergency shadow-emergency text-lg"
                disabled={isLoading}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {isLoading ? "Sender..." : "Send Ansøgning"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mt-8 border-none shadow-professional bg-card/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Hvad sker der nu?</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>1. Vi gennemgår din ansøgning (24-48 timer)</p>
              <p>2. Du bliver kontaktet på Discord for et interview</p>
              <p>3. Ved godkendelse starter din 2 ugers prøveperiode</p>
              <p>4. Velkommen til teamet som fuldgyldigt medlem!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Apply;