/**
 * Footer minimaliste : mentions légales, contact, lien login beta.
 * Pas de mégamenu, pas de social icons surchargés.
 */
export default function Footer() {
  return (
    <footer className="bg-cream border-t border-line">
      <div className="max-w-page mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="" aria-hidden="true" className="w-7 h-7" />
            <span className="text-[15px] font-medium tracking-tight text-ink">
              replikr
            </span>
            <span className="text-[12px] text-graphite ml-2">
              · Pense une fois. Publie dix fois.
            </span>
          </div>

          {/* Liens utilitaires */}
          <nav aria-label="Liens utilitaires" className="flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
            <a
              href="https://app.replikr.io"
              className="rk-link-underline"
            >
              Se connecter
            </a>
            <a href="/mentions-legales" className="rk-link-underline">
              Mentions légales
            </a>
            <a href="/confidentialite" className="rk-link-underline">
              Confidentialité
            </a>
            <a href="mailto:ludovic.nedelec@aelabsolution.com" className="rk-link-underline">
              Contact
            </a>
          </nav>
        </div>

        {/* Copyright + crédit ligne fine */}
        <div className="mt-8 pt-6 border-t border-line text-[11px] text-graphite/80 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <span>© {new Date().getFullYear()} Replikr · Aelab Solution</span>
          <span className="text-[10px] tracking-[0.18em] uppercase">
            Made in France
          </span>
        </div>
      </div>
    </footer>
  );
}
