import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import heroBackground from '@/assets/hero-background.png';

const Auth = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithDiscord, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleDiscordSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await signInWithDiscord();
      
      if (error) {
        setError(error.message || 'Der opstod en fejl under login');
      }
    } catch (err) {
      setError('Der opstod en uventet fejl');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 relative"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/15 backdrop-blur-sm"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            LOGIN SYSTEM
          </Badge>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Log ind til systemet
          </h1>
          <p className="text-muted-foreground">
            Brug din Discord konto for at få adgang
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-none shadow-emergency bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Discord Login</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleDiscordSignIn}
              disabled={isLoading}
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white border-none"
              size="lg"
            >
              <LogIn className="mr-2 h-5 w-5" />
              {isLoading ? 'Logger ind...' : 'Log ind med Discord'}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Ved at logge ind accepterer du vores</p>
              <p>
                <Link to="/terms" className="underline hover:text-foreground">
                  Servicevilkår
                </Link>
                {' og '}
                <Link to="/privacy" className="underline hover:text-foreground">
                  Privatlivspolitik
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground underline"
          >
            Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;