import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Recruiting = () => {
  const requirements = {
    essential: [
      { title: "Alder", description: "Minimum 16 år gammel" },
      { title: "Kommunikation", description: "Godt dansk og arbejdende mikrofon" },
      { title: "Aktivitet", description: "Når du lige har mulighed for det" },
      { title: "Attitude", description: "Professionel og respektfuld adfærd" },
    ],
    preferred: [
      { title: "Engagement", description: "Passion for roleplay og teamwork" },
      { title: "Erfaring", description: "FiveM/roleplay erfaring er en fordel" },
    ],
  };

  const applicationSteps = [
    {
      step: 1,
      title: "Discord Ansøgning",
      description: "Udfylde vores ansøgningsformular",
      timeframe: "5-10 minutter",
    },
    {
      step: 2,
      title: "Baggrundstjek",
      description: "Vi gennemgår din ansøgning og tjekker referencer",
      timeframe: "24-48 timer",
    },
    {
      step: 3,
      title: "Interview",
      description: "Samtale med rekrutteringsteamet",
      timeframe: "30-45 minutter",
    },
    {
      step: 4,
      title: "Prøvetid",
      description: "2 ugers prøveperiode med tæt supervision",
      timeframe: "14 dage",
    },
    {
      step: 5,
      title: "Fuld Medlemsskab",
      description: "Velkommen til teamet som fuldgyldigt medlem",
      timeframe: "Permanent",
    },
  ];

  const positions = [
    {
      title: "Politibetjent",
      description: "Frontline politi arbejde med patruljer, trafikstop og efterforskning.",
      applicationPath: "/ansog?position=police",
    },
    {
      title: "Brandmand",
      description: "Brand og redningsoperationer med specialiseret udstyr.",
      applicationPath: "/ansog?position=fire",
    },
    {
      title: "Paramediciner",
      description: "Medicinsk behandling og hurtig respons til nødsituationer.",
      applicationPath: "/ansog?position=ems",
    },
  ];

  return (
    <div className="container py-16 lg:py-24">
      {/* Header */}
      <header className="max-w-3xl mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Bliv en del af teamet
        </p>
        <h1 className="font-display text-5xl lg:text-6xl font-semibold uppercase tracking-wide leading-none mb-6">
          Rekruttering
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Vi søger dedikerede individer, der ønsker at være en del af et
          professionelt emergency services community.
        </p>
      </header>

      {/* Open positions */}
      <section className="mb-20">
        <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-6">
          Åbne stillinger
        </h2>
        <ul className="divide-y divide-border border-y border-border">
          {positions.map((position) => (
            <li key={position.title} className="py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="font-display text-2xl font-semibold uppercase tracking-wide mb-1">
                  {position.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{position.description}</p>
              </div>
              <Link to={position.applicationPath} className="flex-shrink-0">
                <Button variant="outline">Ansøg</Button>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Requirements */}
      <section className="mb-20 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-2">
            Påkrævet
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {requirements.essential.map((req) => (
              <li key={req.title} className="py-4">
                <h3 className="font-semibold text-foreground">{req.title}</h3>
                <p className="text-sm text-muted-foreground">{req.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-2">
            En fordel
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {requirements.preferred.map((req) => (
              <li key={req.title} className="py-4">
                <h3 className="font-semibold text-foreground">{req.title}</h3>
                <p className="text-sm text-muted-foreground">{req.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application process */}
      <section className="mb-20">
        <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-8">
          Ansøgningsprocessen
        </h2>
        <ol className="space-y-0 border-t border-border">
          {applicationSteps.map((step) => (
            <li key={step.step} className="flex items-start gap-5 border-b border-border py-6">
              <span className="font-display text-3xl font-semibold text-primary leading-none w-10 flex-shrink-0 pt-0.5">
                {step.step}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <span className="text-sm text-muted-foreground">{step.timeframe}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-1">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="border border-border bg-muted/60 p-8 lg:p-12 text-center">
        <h2 className="font-display text-3xl font-semibold uppercase tracking-wide mb-4">
          Klar til at starte?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Bliv en del af vores professionelle team og gør en forskel i
          communityet.
        </p>
        <Link to="/ansog">
          <Button size="lg" className="px-8">
            <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
            Start din ansøgning
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Recruiting;
