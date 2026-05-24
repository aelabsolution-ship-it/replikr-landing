import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

// Inter pour body (2 graisses : 400 et 500, comme spécifié dans la DA)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

// Newsreader Italic pour titres serif. On charge regular + medium en italique.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://replikr.app"),
  title: "Replikr · Pense une fois. Publie dix fois.",
  description:
    "Une vidéo. Six réseaux. Votre voix sur chacun. Replikr décline vos vidéos longues en posts natifs LinkedIn, X, Instagram, Threads, TikTok, YouTube — sans perdre votre style.",
  openGraph: {
    title: "Replikr · Pense une fois. Publie dix fois.",
    description:
      "Une vidéo. Six réseaux. Votre voix sur chacun.",
    type: "website",
    locale: "fr_FR",
    url: "https://replikr.app",
    siteName: "Replikr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Replikr · Pense une fois. Publie dix fois.",
    description: "Une vidéo. Six réseaux. Votre voix sur chacun.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
