import { YouTubeIcon } from "./PlatformIcons";

/**
 * Mockup YouTube Short : format vertical 9:16. Replikr publie le Short
 * (extrait court de la vidéo longue), l'utilisateur garde la main sur le
 * format long. Distinct visuellement de TikTok : accent rouge YouTube,
 * bouton S'abonner, badge "Shorts" en overlay.
 */
export default function YouTubePost() {
  return (
    <article className="w-full bg-surface rounded-xl border border-line overflow-hidden text-left">
      {/* Vidéo verticale 9:16 fond noir */}
      <div
        className="relative bg-ink mx-auto"
        style={{ aspectRatio: "9 / 16", maxHeight: "260px" }}
      >
        {/* Badge "Shorts" en haut */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-[#FF0000] text-cream text-[10px] font-medium px-1.5 py-0.5 rounded">
          <YouTubeIcon size={10} />
          <span>Shorts</span>
        </div>

        {/* Texte impact centré */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <p className="font-serif italic text-cream text-xl text-center leading-tight">
            L&apos;IA ne va pas
            <br />
            vous remplacer.
          </p>
        </div>

        {/* Actions latérales (sans compteurs) */}
        <div className="absolute right-2 bottom-12 flex flex-col gap-3 items-center text-cream">
          <div className="w-7 h-7 rounded-full bg-cream/20 flex items-center justify-center text-[12px]">
            👍
          </div>
          <div className="w-7 h-7 rounded-full bg-cream/20 flex items-center justify-center text-[12px]">
            💬
          </div>
          <div className="w-7 h-7 rounded-full bg-cream/20 flex items-center justify-center text-[12px]">
            ↗
          </div>
        </div>

        {/* Footer avec handle chaîne + bouton S'abonner */}
        <div className="absolute left-3 right-12 bottom-3 flex items-center gap-2 text-cream">
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/profil_ludo.png"
              alt="Ludovic Nédélec"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[11px] font-medium leading-tight flex-1 truncate">
            @LudovicNedelec
          </span>
          <span className="text-[10px] font-medium bg-[#FF0000] px-2 py-0.5 rounded-full">
            S&apos;abonner
          </span>
        </div>
      </div>
    </article>
  );
}
