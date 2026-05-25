import { ThreadsIcon } from "./PlatformIcons";

/**
 * Mockup Threads — format texte court (max 500 chars), ton conversationnel.
 */
export default function ThreadsPost() {
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
            ludovicnedelec
          </p>
          <p className="text-[11px] text-graphite leading-tight">2h</p>
        </div>
        <ThreadsIcon size={16} />
      </header>

      <p className="text-[13px] text-ink leading-[1.55] mb-2">
        L&apos;IA ne va pas remplacer votre business.
      </p>
      <p className="text-[13px] text-ink leading-[1.55] mb-3">
        Elle va remplacer ceux qui n&apos;y touchent pas.
      </p>

      <div className="flex items-center gap-5 pt-3 border-t border-line text-graphite">
        <span aria-hidden className="text-[13px]">♥</span>
        <span aria-hidden className="text-[13px]">💬</span>
        <span aria-hidden className="text-[13px]">↻</span>
        <span aria-hidden className="text-[13px]">↗</span>
      </div>
    </article>
  );
}
