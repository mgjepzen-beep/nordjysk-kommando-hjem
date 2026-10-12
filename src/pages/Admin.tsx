import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import NotFound from "./NotFound";

const Admin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) { setIsAdmin(false); return; }
    supabase
      .from("user_roles" as any)
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data, error }) => setIsAdmin(!error && !!data));
  }, [user, loading]);

  if (loading || isAdmin === null) return <div className="min-h-[60vh]" />;
  if (!isAdmin) return <NotFound />;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <p className="font-display text-sm uppercase tracking-widest text-primary mb-2">Administrator</p>
      <h1 className="font-display text-4xl font-semibold uppercase mb-4">Kontrolpanel</h1>
      <p className="text-muted-foreground">
        Du er logget ind som administrator. Her kan vi tilføje værktøjer, f.eks. Discord-tæller og ansøgninger.
      </p>
    </div>
  );
};

export default Admin;
