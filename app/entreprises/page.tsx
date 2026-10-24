import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import LandingEnhancements from "@/components/LandingEnhancements";
import "../affiliation.css";
import "../entreprises.css";

export const dynamic = "force-static";

const title = "Hybana pour les entreprises : sur mesure";
const description = "Hybana installé pour votre organisation : votre marque, vos gabarits, vos règles éditoriales, vos canaux. Mise en route accompagnée.";

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/entreprises" },
  openGraph: { title, description, type: "website", locale: "fr_FR", url: "https://www.hybana.com/entreprises", siteName: "Hybana" },
  twitter: { card: "summary", title, description },
};

// Reviewed, repository-owned HTML; read at build time, with no visitor input.
const page = readFileSync(path.join(process.cwd(), "content/entreprises.html"), "utf8");
const parts = page.match(/^([\s\S]*?)<main>([\s\S]*?)<\/main>([\s\S]*)$/);
if (!parts) throw new Error("Entreprises page must contain one main element");

export default function EntreprisesPage() {
  return <>
    <div dangerouslySetInnerHTML={{ __html: parts![1] }} />
    <main>
      <div dangerouslySetInnerHTML={{ __html: parts![2] }} style={{ display: "contents" }} />
    </main>
    <div dangerouslySetInnerHTML={{ __html: parts![3] }} />
    <LandingEnhancements />
  </>;
}
