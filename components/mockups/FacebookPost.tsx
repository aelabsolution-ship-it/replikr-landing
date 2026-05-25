import { FacebookIcon } from "./PlatformIcons";

/**
 * Mockup post Facebook : format communautaire, ton plus chaleureux,
 * réactions emoji, partage. Layout natif Facebook (avatar, nom, contenu,
 * compteur de réactions et commentaires).
 */
export default function FacebookPost() {
  return (
    <article className="w-full bg-surface rounded-xl border border-line p-5 text-left">
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
            il y a 2 h · Public
          </p>
        </div>
        <FacebookIcon size={18} />
      </header>

      <p className="text-[13px] text-ink leading-[1.55] mb-2">
        L&apos;IA ne remplacera pas votre business.
      </p>
      <p className="text-[13px] text-ink leading-[1.55] mb-3">
        Elle remplacera ceux qui ne s&apos;y mettent pas.
      </p>
      <p className="text-[12.5px] text-graphite leading-[1.55] mb-4">
        Petit retour d&apos;expérience après 14 entrepreneurs accompagnés cette
        année. Ceux qui cartonnent ont tous automatisé leur création de
        contenu. Sans perdre leur voix. Sans publier de la bouillie générique.
      </p>

      <div className="flex items-center gap-5 pt-3 border-t border-line text-graphite">
        <span aria-hidden className="text-[13px]">👍</span>
        <span aria-hidden className="text-[13px]">💬</span>
        <span aria-hidden className="text-[13px]">↗</span>
      </div>
    </article>
  );
}
