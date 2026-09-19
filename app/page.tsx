import { readFileSync } from "node:fs";
import path from "node:path";
import LandingEnhancements from "@/components/LandingEnhancements";
import CookieBanner from "@/components/CookieBanner";

export const dynamic = "force-static";

// Reviewed, repository-owned HTML; read at build time, with no visitor input.
const landing = readFileSync(path.join(process.cwd(), "content/replikr.html"), "utf8");

export default function HomePage() {
  return <><div dangerouslySetInnerHTML={{ __html: landing }} /><LandingEnhancements /><CookieBanner /></>;
}
