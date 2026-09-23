import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "../public/reference/styles.css";
import "../public/reference/styles/lofi-tokens.css";
import "../public/reference/replikr.css";
import "./replikr.css";
import "./sombre.css";

// Typographie façon Raycast : Inter partout (titres, texte, interface).
const interFont = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-ibm-plex", display: "swap" });

const title = "Replikr · Votre notebook de création de contenu";
const description = "Vidéos, documents et notes vocales : Replikr transforme votre matière en publications, visuels et formats courts, dans votre voix. 60 crédits d’essai offerts.";

export const metadata: Metadata = {
  metadataBase: new URL("https://replikr.io"), title, description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", locale: "fr_FR", url: "https://replikr.io", siteName: "Replikr" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr" className={[interFont.variable, monoFont.variable].join(" ")}><body className="oi-page">{children}</body></html>;
}
