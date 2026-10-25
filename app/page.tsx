import { readFileSync } from "node:fs";
import path from "node:path";
import LandingEnhancements from "@/components/LandingEnhancements";
import AvisSection from "@/components/AvisSection";
import HeroVsl from "@/components/HeroVsl";
import SoftwareJsonLd from "@/components/SoftwareJsonLd";

export const dynamic = "force-static";

// Reviewed, repository-owned HTML; read at build time, with no visitor input.
const landing = readFileSync(path.join(process.cwd(), "content/replikr.html"), "utf8");
const parts = landing.match(/^([\s\S]*?)<main>([\s\S]*?)<\/main>([\s\S]*)$/);
if (!parts) throw new Error("Landing page must contain one main element");
// Pas de tarifs sur la landing : ils s'affichent dans l'app, après l'essai.
const [beforeAvis, afterAvis] = parts[2].split("<!-- avis-section -->");
if (afterAvis === undefined) throw new Error("Missing avis section marker");

export default function HomePage() {
  return <>
    <SoftwareJsonLd />
    <div dangerouslySetInnerHTML={{ __html: parts![1] }} />
    <main>
      <div dangerouslySetInnerHTML={{ __html: beforeAvis }} />
      <AvisSection />
      <div dangerouslySetInnerHTML={{ __html: afterAvis }} />
    </main>
    <div dangerouslySetInnerHTML={{ __html: parts![3] }} />
    <LandingEnhancements /><HeroVsl />
  </>;
}
