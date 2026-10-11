import LegalPage from "@/components/LegalPage";

const P = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-foreground bg-muted px-1 rounded">{children}</span>
);

const Privacy = () => (
  <LegalPage
    title="Privatlivspolitik"
    updated="[DATO]"
    intro="Her kan du læse, hvilke oplysninger NORDJYSK FIVEPD indsamler, hvorfor vi gør det, og hvilke rettigheder du har efter databeskyttelsesforordningen (GDPR)."
    sections={[
      {
        title: "Dataansvarlig",
        body: (
          <p>
            Den dataansvarlige er <P>[NAVN PÅ ANSVARLIG PERSON / FORENING]</P>, kontakt: <P>mgjepzen@gmail.com</P>.
            NORDJYSK FIVEPD er et fiktivt rollespilsfællesskab og har ingen tilknytning til Rigspolitiet, beredskabet
            eller andre myndigheder.
          </p>
        ),
      },
      {
        title: "Hvilke oplysninger vi behandler",
        body: (
          <>
            <p>
              <strong className="text-foreground">Ansøgninger:</strong> navn, alder, Discord-brugernavn, erfaring,
              motivation og tilgængelighed. På den generelle ansøgning også e-mail og (frivilligt) telefonnummer.
            </p>
            <p>
              <strong className="text-foreground">Login med Discord:</strong> Discord-id, brugernavn, visningsnavn og
              profilbillede.
            </p>
            <p>
              <strong className="text-foreground">Teknisk:</strong> din IP-adresse bruges kortvarigt i krypteret
              (hashet) form for at begrænse spam. Vi gemmer ikke IP-adressen i klar tekst.
            </p>
          </>
        ),
      },
      {
        title: "Formål og retsgrundlag",
        body: (
          <p>
            Vi behandler ansøgninger for at vurdere optagelse i fællesskabet og login-oplysninger for at give dig adgang
            til din profil (GDPR art. 6, stk. 1, litra b og f). Spambeskyttelse sker på grundlag af vores legitime
            interesse i at holde tjenesten sikker (litra f).
          </p>
        ),
      },
      {
        title: "Hvem modtager oplysningerne",
        body: (
          <p>
            Ansøgninger sendes til en lukket kanal på vores Discord-server, hvor kun <P>Leder rollerne</P> har adgang.
            Vi bruger Supabase (hosting og login) og Discord Inc. som databehandlere/tjenester. Discord kan behandle
            data uden for EU under deres egne vilkår.
          </p>
        ),
      },
      {
        title: "Opbevaring",
        body: (
          <p>
            Ansøgninger slettes senest <P>6 måneder</P> efter afgørelse. Profiloplysninger opbevares, så længe du har en
            konto. Spambeskyttelsesdata slettes automatisk efter højst ét døgn.
          </p>
        ),
      },
      {
        title: "Alder",
        body: (
          <p>
            Du skal være mindst 16 år for at ansøge. Er du under 15 år, må du ikke give os personoplysninger uden
            samtykke fra en forælder.
          </p>
        ),
      },
      {
        title: "Dine rettigheder",
        body: (
          <p>
            Du har ret til indsigt, berigtigelse, sletning, begrænsning, dataportabilitet og indsigelse. Kontakt os på{" "}
            <P>mgjepzen@gmail.com</P>. Du kan klage til Datatilsynet på{" "}
            <a className="underline text-primary" href="https://www.datatilsynet.dk" target="_blank" rel="noreferrer">
              datatilsynet.dk
            </a>
            .
          </p>
        ),
      },
      {
        title: "Cookies",
        body: (
          <p>
            Vi bruger ikke sporings- eller marketingcookies. Når du logger ind, gemmes en nødvendig login-nøgle i din
            browser for at holde dig logget ind.
          </p>
        ),
      },
    ]}
  />
);

export default Privacy;
