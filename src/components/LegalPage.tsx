import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Section { title: string; body: ReactNode }

const LegalPage = ({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: Section[] }) => (
  <div className="container mx-auto px-4 py-16 max-w-3xl">
    <header className="mb-10">
      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Juridisk</p>
      <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
      <p className="text-muted-foreground">{intro}</p>
      <p className="text-xs text-muted-foreground mt-3">Senest opdateret: {updated}</p>
    </header>
    <Card className="border-border/50">
      <CardContent className="p-8 space-y-8">
        {sections.map((s, i) => (
          <section key={s.title}>
            <h2 className="text-xl font-semibold text-foreground mb-3">{i + 1}. {s.title}</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">{s.body}</div>
          </section>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default LegalPage;
