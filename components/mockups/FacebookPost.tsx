import { FacebookIcon } from "./PlatformIcons";

/**
 * Mockup post Facebook : format communautaire avec image. Le post porte
 * sur le carrousel LinkedIn (sujet de l'infographie `imagepost.png` que
 * Replikr aurait générée pour ce post). Layout natif Facebook : header,
 * texte d'accroche, image pleine largeur (sans padding), réactions.
 */
export default function FacebookPost() {
  return (
    <article className="w-full bg-surface rounded-xl border border-line overflow-hidden text-left">
      <header className="flex items-center gap-3 p-3.5 pb-2">
        <img
          src="/profil_ludo.png"
          alt="Ludovic Nédélec"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-ink leading-tight truncate">
            Ludovic Nédélec
          </p>
          <p className="text-[11px] text-graphite leading-tight">
            il y a 2 h · Public
          </p>
        </div>
        <FacebookIcon size={18} />
      </header>

      <p className="text-[13px] text-ink leading-[1.55] px-3.5 mb-3">
        Le format qui cartonne le plus sur LinkedIn en 2026&nbsp;? Le
        carrousel.{" "}
        <span className="text-graphite">... plus</span>
      </p>

      {/* Image pleine largeur (édité par Replikr) */}
      <div className="w-full bg-ink">
        <img
          src="/imagepost.png"
          alt="Le carrousel LinkedIn : le format qui génère le plus d'engagement"
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>

      <div className="flex items-center gap-5 px-3.5 py-2.5 border-t border-line text-graphite">
        <span aria-hidden className="text-[13px]">👍</span>
        <span aria-hidden className="text-[13px]">💬</span>
        <span aria-hidden className="text-[13px]">↗</span>
      </div>
    </article>
  );
}
