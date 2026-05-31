import { LinkedInIcon } from "./PlatformIcons";

/**
 * Mockup post LinkedIn — format long, autorité, ton expert.
 * Reproduit le layout LinkedIn natif : avatar + nom + intro + corps + CTA.
 */
export default function LinkedInPost() {
  return (
    <article className="w-full bg-surface rounded-xl border border-line p-5 text-left">
      {/* Header : avatar + nom + handle */}
      <header className="flex items-center gap-3 mb-3">
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
            Consultant IA · 5K abonnés · 2h
          </p>
        </div>
        <LinkedInIcon size={18} />
      </header>

      {/* Corps : hook poétique sur l'adaptation cross-réseaux (Ludovic
          mai 2026). Court par design — c'est l'aphorisme qui frappe. */}
      <p className="text-[13px] text-ink leading-[1.55] mb-2">
        Adapter un contenu, c&apos;est pas le trahir.
      </p>
      <p className="text-[13px] text-ink leading-[1.55] mb-3">
        C&apos;est le traduire.
      </p>
      <p className="text-[12.5px] text-graphite leading-[1.55] mb-3">
        Un carrousel LinkedIn et une vidéo YouTube disent la même chose.
        Juste dans deux langues différentes.
      </p>

      {/* Actions LinkedIn sans compteurs */}
      <div className="flex items-center gap-5 pt-3 border-t border-line text-graphite">
        <span aria-hidden className="text-[13px]">👍</span>
        <span aria-hidden className="text-[13px]">💬</span>
        <span aria-hidden className="text-[13px]">↻</span>
        <span aria-hidden className="text-[13px]">↗</span>
      </div>
    </article>
  );
}
