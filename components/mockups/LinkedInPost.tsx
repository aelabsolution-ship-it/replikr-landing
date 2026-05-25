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

      {/* Corps long-format */}
      <p className="text-[13px] text-ink leading-[1.55] mb-2">
        L&apos;IA ne va pas remplacer votre business.
      </p>
      <p className="text-[13px] text-ink leading-[1.55] mb-2">
        Elle va remplacer ceux qui n&apos;y touchent pas.
      </p>
      <p className="text-[12.5px] text-graphite leading-[1.55] mb-3">
        J&apos;ai accompagné 14 infopreneurs ces 6 derniers mois. Ceux qui
        cartonnent ont un point commun : ils ont automatisé leur création de
        contenu. Pas pour publier plus. Pour publier mieux, sans s&apos;épuiser.
      </p>

      {/* CTA + métriques */}
      <div className="flex items-center gap-4 pt-3 border-t border-line text-[11px] text-graphite">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-violet inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#FF6B6B] inline-block -ml-2" />
          <span className="font-medium">147</span>
        </span>
        <span>32 commentaires</span>
        <span>18 reposts</span>
      </div>
    </article>
  );
}
