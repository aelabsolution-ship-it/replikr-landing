import type { Metadata } from "next";
import { Source_Serif_4, Lora, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "../public/reference/styles.css";
import "../public/reference/styles/lofi-tokens.css";
import "../public/reference/replikr.css";
import "./replikr.css";

const titleFont = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif", display: "swap" });
const bodyFont = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const uiFont = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const monoFont = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-ibm-plex", display: "swap" });

const title = "Replikr · Votre notebook de création de contenu";
const description = "Vidéos, documents et notes vocales : Replikr transforme votre matière en publications, visuels et formats courts, dans votre voix. 500 crédits d’essai offerts.";

export const metadata: Metadata = {
  metadataBase: new URL("https://replikr.io"), title, description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "website", locale: "fr_FR", url: "https://replikr.io", siteName: "Replikr" },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr" className={[titleFont.variable, bodyFont.variable, uiFont.variable, monoFont.variable].join(" ")}><body className="oi-page">{children}</body></html>;
}
