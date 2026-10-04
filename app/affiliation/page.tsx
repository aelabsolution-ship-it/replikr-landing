import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import LandingEnhancements from "@/components/LandingEnhancements";
import CookieBanner from "@/components/CookieBanner";
import AffiliationSimulator from "@/components/AffiliationSimulator";
import "../affiliation.css";

export const dynamic = "force-static";

const title = "Affiliation Replikr : 20 % pendant 12 mois";
const description = "Recommandez Replikr et touchez 20 % des abonnements de vos clients pendant leur première année. Inscription immédiate, sans plafond, aucun cookie.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/affiliation" },
  openGraph: { title, description, type: "website", locale: "fr_FR", url: "https://replikr.io/affiliation", siteName: "Replikr" },
  twitter: { card: "summary", title, description },
};

// Reviewed, repository-owned HTML; read at build time, with no visitor input.
const page = readFileSync(path.join(process.cwd(), "content/affiliation.html"), "utf8");
const parts = page.match(/^([\s\S]*?)<main>([\s\S]*?)<\/main>([\s\S]*)$/);
if (!parts) throw new Error("Affiliation page must contain one main element");
const [beforeHero, afterHero] = parts[2].split("<!-- hero -->");
if (afterHero === undefined) throw new Error("Missing hero marker");

const APP = "https://app.replikr.io/affiliation";

function Hero() {
  return (
    <section className="oi-hero af-hero" id="hero">
      <div className="hero__bg" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="oi-wide">
        <div className="oi-hero__intro">
          <p className="af-kicker">Programme d’affiliation</p>
          <h1>Recommandez Replikr.<br /><em>Touchez 20 % pendant 12 mois.</em></h1>
          <p className="oi-hero__lead">Sur chaque abonnement payé par les personnes que vous amenez, pendant leur première année. Sans plafond. Inscription immédiate.</p>
          <p className="af-gift">Et vos clients ont <strong>-10 % pendant 12 mois.</strong></p>
          <div className="oi-hero__actions">
            <a href={APP} className="btn btn--primary btn--lg btn--glow">Devenir affilié</a>
            <a href="#regles" className="oi-btn-ghost af-ghost">Lire les règles</a>
          </div>
        </div>
        <div className="oi-hero__stage"><AffiliationSimulator /></div>
      </div>
    </section>
  );
}

export default function AffiliationPage() {
  return <>
    <div dangerouslySetInnerHTML={{ __html: parts![1] }} />
    <main>
      <div dangerouslySetInnerHTML={{ __html: beforeHero }} style={{ display: "contents" }} />
      <Hero />
      <div dangerouslySetInnerHTML={{ __html: afterHero }} style={{ display: "contents" }} />
    </main>
    <div dangerouslySetInnerHTML={{ __html: parts![3] }} />
    <LandingEnhancements /><CookieBanner />
  </>;
}
