import { readFileSync } from "node:fs";
import path from "node:path";
import LandingEnhancements from "@/components/LandingEnhancements";
import CookieBanner from "@/components/CookieBanner";
import PricingSection from "@/components/ui/pricing-section-3";

export const dynamic = "force-static";

// Reviewed, repository-owned HTML; read at build time, with no visitor input.
const landing = readFileSync(path.join(process.cwd(), "content/replikr.html"), "utf8");
const parts = landing.match(/^([\s\S]*?)<main>([\s\S]*?)<\/main>([\s\S]*)$/);
if (!parts) throw new Error("Landing page must contain one main element");
const [beforePricing, afterPricing] = parts[2].split("<!-- pricing-section -->");
if (afterPricing === undefined) throw new Error("Missing pricing section marker");

export default function HomePage() {
  return <>
    <div dangerouslySetInnerHTML={{ __html: parts![1] }} />
    <main>
      <div dangerouslySetInnerHTML={{ __html: beforePricing }} />
      <PricingSection />
      <div dangerouslySetInnerHTML={{ __html: afterPricing }} />
    </main>
    <div dangerouslySetInnerHTML={{ __html: parts![3] }} />
    <LandingEnhancements /><CookieBanner />
  </>;
}
