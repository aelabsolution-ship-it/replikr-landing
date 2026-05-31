import { TikTokIcon } from "./PlatformIcons";

/**
 * Mockup TikTok — vertical, format Short, ton hook + accroche directe.
 */
export default function TikTokPost() {
  return (
    <article className="w-full bg-surface rounded-xl border border-line overflow-hidden text-left">
      {/* Vidéo verticale 9:16 */}
      <div
        className="relative bg-ink mx-auto"
        style={{ aspectRatio: "9 / 16", maxHeight: "220px" }}
      >
        {/* Texte impact centré */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <p className="font-serif italic text-cream text-xl text-center leading-tight">
            POV : Replikr
            <br />
            publie sur tes
            <br />
            7 réseaux
            <br />
            en 12 min.
          </p>
        </div>

        {/* Actions latérales TikTok (sans compteurs) */}
        <div className="absolute right-2 bottom-12 flex flex-col gap-4 items-center text-cream">
          <div className="w-7 h-7 rounded-full bg-cream/20 flex items-center justify-center text-[12px]">
            ♥
          </div>
          <div className="w-7 h-7 rounded-full bg-cream/20 flex items-center justify-center text-[12px]">
            💬
          </div>
          <div className="w-7 h-7 rounded-full bg-cream/20 flex items-center justify-center text-[12px]">
            ↗
          </div>
        </div>

        {/* Caption en bas */}
        <div className="absolute left-3 right-12 bottom-3 text-cream">
          <p className="text-[11px] font-medium leading-tight mb-1">
            @ludovicnedelec
          </p>
          <p className="text-[11px] leading-tight opacity-90">
            #createur #youtube #ia
          </p>
        </div>

        {/* Logo TikTok overlay */}
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-cream/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <TikTokIcon size={12} />
          </div>
        </div>
      </div>
    </article>
  );
}
