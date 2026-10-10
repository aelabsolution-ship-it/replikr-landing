import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "../public/reference/styles.css";
import "../public/reference/styles/lofi-tokens.css";
import "../public/reference/replikr.css";
import "./replikr.css";
import "./sombre.css";
import "./solo.css";
import "./profile-scan.css";
import "./document-demo.css";
import "./proof.css";
import "./hero-motion.css";
import "./vsl.css";
import "./layout-spacing.css";

// Typographie façon Raycast : Inter partout (titres, texte, interface).
const interFont = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-ibm-plex", display: "swap" });

const title = "Hybana : faites connaître votre expertise";
const promesse = "Vos futurs clients sont sur les réseaux. Vous, vous n’avez pas le temps d’y être.";
const description = "Hybana transforme votre expertise en posts et en images pour attirer vos futurs clients. Partez de vos documents, vidéos ou notes vocales.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hybana.com"), title, description,
  alternates: { canonical: "/" },
  openGraph: { title: promesse, description, type: "website", locale: "fr_FR", url: "https://www.hybana.com", siteName: "Hybana" },
  twitter: { card: "summary", title: promesse, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr" className={[interFont.variable, monoFont.variable].join(" ")}><body className="oi-page">{children}</body></html>;
}
