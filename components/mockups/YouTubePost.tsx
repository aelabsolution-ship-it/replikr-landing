import { YouTubeIcon } from "./PlatformIcons";

/**
 * Mockup YouTube — long format (thumbnail vidéo + titre + description).
 */
export default function YouTubePost() {
  return (
    <article className="w-full bg-surface rounded-xl border border-line overflow-hidden text-left">
      {/* Thumbnail vidéo : noir avec text overlay */}
      <div className="aspect-video bg-ink relative flex items-center justify-center">
        <p className="font-serif italic text-cream text-2xl text-center px-4 leading-tight">
          L&apos;IA ne va pas
          <br />
          vous remplacer
        </p>
        <span className="absolute bottom-2 right-2 bg-ink/90 text-cream text-[10px] px-1.5 py-0.5 rounded">
          12:34
        </span>
      </div>

      {/* Title + meta */}
      <div className="p-4">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-ink flex-shrink-0 flex items-center justify-center text-cream text-[10px] font-medium">
            LN
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[13.5px] font-medium text-ink leading-snug line-clamp-2">
              Comment l&apos;IA va remplacer ceux qui n&apos;y touchent pas
              (et comment ne pas en faire partie)
            </h3>
            <p className="text-[11px] text-graphite mt-1">
              Ludovic Nédélec · 5,7K abonnés
            </p>
            <p className="text-[11px] text-graphite">
              2,4K vues · il y a 2 heures
            </p>
          </div>
          <YouTubeIcon size={16} />
        </div>
      </div>
    </article>
  );
}
