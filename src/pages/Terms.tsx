import LegalPage from "@/components/LegalPage";

const P = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-foreground">{children}</span>
);

const Terms = () => (
  <LegalPage
    title="Vilkår og juridisk information"
    updated="10/12/2026"
    intro="Information om hvem der driver siden, regler for brug og forbehold vedrørende varemærker og spilindhold."
    sections={[
      {
        title: "Hvem driver siden",
        body: (
          <p>
            Siden drives af <P>Mikkel Gottlieb</P>, <P>5000, Odense</P>, kontakt: <P>mgjepzen@gmail.com</P>. Siden er
            ikke kommerciel.
          </p>
        ),
      },
      {
        title: "Fiktivt rollespil",
        body: (
          <p>
            PROJEKT BLÅ BLINK er et fiktivt rollespilsfællesskab. Vi er ikke en del af, godkendt af eller tilknyttet
            Rigspolitiet, dansk eller udenlandsk politi, beredskabet, regioner eller andre offentlige myndigheder. Intet på siden
            må bruges til at udgive sig for at være offentlig myndighed.
          </p>
        ),
      },
      {
        title: "Varemærker og spilindhold",
        body: (
          <p>
            FiveM, FivePD, Grand Theft Auto og Rockstar Games er varemærker tilhørende deres respektive ejere. Denne
            side er ikke tilknyttet, sponsoreret eller godkendt af Rockstar Games, Take-Two Interactive, Cfx.re eller
            FivePD. Billeder på siden er <P>egne billeder taget i spillet (in-game)</P>.
          </p>
        ),
      },
      {
        title: "Brug af siden",
        body: (
          <p>
            Du må ikke sende falske, krænkende eller automatiserede ansøgninger, forsøge at omgå sikkerheden eller
            misbruge andres oplysninger. Vi kan afvise ansøgninger og fjerne adgang ved misbrug.
          </p>
        ),
      },
      {
        title: "Ansvar",
        body: (
          <p>
            Siden leveres, som den er. Vi tilstræber korrekte oplysninger, men kan ikke garantere, at siden altid er
            tilgængelig eller fejlfri.
          </p>
        ),
      },
      {
        title: "Ændringer og kontakt",
        body: (
          <p>
            Vilkårene kan blive opdateret. Spørgsmål sendes til <P>mgjepzen@gmail.com</P>. Se også vores{" "}
            <a href="/privatlivspolitik" className="underline text-primary">
              privatlivspolitik
            </a>
            .
          </p>
        ),
      },
    ]}
  />
);

export default Terms;
