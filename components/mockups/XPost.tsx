import { XIcon } from "./PlatformIcons";

/**
 * Mockup post X — format court 280 caractères, ton percutant.
 */
export default function XPost() {
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
            Ludovic Nédélec{" "}
            <span className="text-graphite font-normal">@ludovicnedelec · 2h</span>
          </p>
        </div>
        <XIcon size={16} />
      </header>

      <p className="text-[13.5px] text-ink leading-[1.5] mb-3">
        L&apos;IA ne remplacera pas votre business.
        <br />
        Elle remplacera ceux qui n&apos;y touchent pas.
      </p>

      <div className="flex items-center gap-6 text-graphite">
        <span aria-hidden className="text-[13px]">💬</span>
        <span aria-hidden className="text-[13px]">↻</span>
        <span aria-hidden className="text-[13px]">♥</span>
        <span aria-hidden className="text-[13px]">↗</span>
      </div>
    </article>
  );
}
