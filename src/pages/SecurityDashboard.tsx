import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Activity, Lock } from "lucide-react";
import { getSecurityLog, detectSuspiciousActivity, SecurityEvent } from "@/lib/security";
import { useAuth } from "@/contexts/AuthContext";

const SecurityDashboard = () => {
  const { user } = useAuth();
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [hasSuspiciousActivity, setHasSuspiciousActivity] = useState(false);

  useEffect(() => {
    const events = getSecurityLog();
    setSecurityEvents(events.slice(-20)); // Show last 20 events
    setHasSuspiciousActivity(detectSuspiciousActivity(events));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Du skal være logget ind for at se sikkerhedsdashboardet.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'auth_success': return <Shield className="w-4 h-4 text-green-500" />;
      case 'auth_failure': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'application_submit': return <Activity className="w-4 h-4 text-blue-500" />;
      case 'rate_limit_exceeded': return <Lock className="w-4 h-4 text-orange-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEventVariant = (type: string) => {
    switch (type) {
      case 'auth_success': return 'default';
      case 'auth_failure': return 'destructive';
      case 'application_submit': return 'secondary';
      case 'rate_limit_exceeded': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Sikkerhedsdashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Overvåg systemets sikkerhedsstatus og aktiviteter.
          </p>
        </div>

        {/* Security Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sikkerhedsstatus</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {hasSuspiciousActivity ? (
                  <span className="text-red-500">Advarsel</span>
                ) : (
                  <span className="text-green-500">Sikker</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {hasSuspiciousActivity 
                  ? "Mistænkelig aktivitet registreret"
                  : "Ingen sikkerhedstrusler registreret"
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktive Sessioner</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Din nuværende session
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seneste Aktivitet</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{securityEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                Sikkerhedshændelser i dag
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Security Events */}
        <Card>
          <CardHeader>
            <CardTitle>Seneste Sikkerhedshændelser</CardTitle>
          </CardHeader>
          <CardContent>
            {securityEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Ingen sikkerhedshændelser registreret.
              </p>
            ) : (
              <div className="space-y-4">
                {securityEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getEventIcon(event.type)}
                      <div>
                        <Badge variant={getEventVariant(event.type) as any}>
                          {event.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(event.timestamp).toLocaleString('da-DK')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {event.ip && (
                        <p className="text-sm text-muted-foreground">
                          IP: {event.ip.slice(0, 10)}...
                        </p>
                      )}
                      {event.metadata && (
                        <p className="text-xs text-muted-foreground">
                          {JSON.stringify(event.metadata, null, 0).slice(0, 50)}...
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Sikkerhedsanbefalinger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Stærke adgangskoder</h4>
                  <p className="text-sm text-muted-foreground">
                    Brug altid stærke, unikke adgangskoder for alle konti.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">To-faktor-autentificering</h4>
                  <p className="text-sm text-muted-foreground">
                    Aktiver 2FA på alle kritiske konti for ekstra sikkerhed.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Regelmæssige sikkerhedsopdateringer</h4>
                  <p className="text-sm text-muted-foreground">
                    Hold alle systemer opdaterede med de seneste sikkerhedsrettelser.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityDashboard;