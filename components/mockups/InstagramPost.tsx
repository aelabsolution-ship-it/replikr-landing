import { InstagramIcon } from "./PlatformIcons";

/**
 * Mockup post Instagram — carrousel, format carré, ton inspirationnel.
 * Image visuelle dominante + caption courte.
 */
export default function InstagramPost() {
  return (
    <article className="w-full bg-surface rounded-xl border border-line overflow-hidden text-left">
      {/* Header */}
      <header className="flex items-center gap-3 p-3.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet via-[#E4405F] to-[#F0AD4E] p-[2px]">
          <img
            src="/profil_ludo.png"
            alt="Ludovic Nédélec"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-medium text-ink leading-tight truncate">
            ludovicnedelec
          </p>
        </div>
        <InstagramIcon size={16} />
      </header>

      {/* Visuel carrousel : violet flat avec gros texte impact */}
      <div className="aspect-square bg-violet relative flex flex-col items-center justify-center px-6 text-center">
        <p className="font-serif italic text-cream text-2xl leading-tight">
          Pense une fois.
          <br />
          Publie dix fois.
        </p>
        <span className="absolute bottom-3 right-3 text-[10px] text-cream/60 tracking-wide">
          1 / 6
        </span>
      </div>

      {/* Actions Instagram (sans compteurs) + caption */}
      <div className="p-3.5">
        <div className="flex items-center gap-4 mb-2 text-ink">
          <span aria-hidden className="text-[16px]">♥</span>
          <span aria-hidden className="text-[16px]">💬</span>
          <span aria-hidden className="text-[16px]">↗</span>
        </div>
        <p className="text-[12px] text-ink leading-[1.45]">
          <span className="font-medium">ludovicnedelec</span> L&apos;IA ne va pas
          remplacer votre business. Elle va remplacer ceux qui n&apos;y touchent
          pas. Une idée forte, pensée une fois, publiée partout.{" "}
          <span className="text-graphite">... plus</span>
        </p>
      </div>
    </article>
  );
}
