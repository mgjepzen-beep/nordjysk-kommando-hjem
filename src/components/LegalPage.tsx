import { ReactNode } from "react";

interface Section { title: string; body: ReactNode }

const LegalPage = ({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: Section[] }) => (
  <div className="container px-4 py-16 max-w-3xl">
    <header className="mb-12 border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Juridisk</p>
      <h1 className="font-display text-4xl lg:text-5xl font-semibold uppercase tracking-wide text-foreground mb-4">{title}</h1>
      <p className="text-muted-foreground leading-relaxed">{intro}</p>
      <p className="text-sm text-muted-foreground mt-4">Senest opdateret: {updated}</p>
    </header>
    <article className="space-y-10">
      {sections.map((s, i) => (
        <section key={s.title} className="border-b border-border pb-10 last:border-b-0">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">{i + 1}. {s.title}</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">{s.body}</div>
        </section>
      ))}
    </article>
  </div>
);

export default LegalPage;
