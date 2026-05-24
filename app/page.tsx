import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import DemoSection from "@/components/DemoSection";
import ContrastSection from "@/components/ContrastSection";
import HowSection from "@/components/HowSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";
import CookieBanner from "@/components/CookieBanner";

export default function HomePage() {
  return (
    <>
      {/* IntersectionObserver pour les .rk-reveal — un script unique pour
          toute la page, monté côté client. */}
      <RevealOnScroll />

      <Nav />

      <main>
        <HeroSection />
        <DemoSection />
        <ContrastSection />
        <HowSection />
        <CtaSection />
      </main>

      <Footer />
      <CookieBanner />
    </>
  );
}
