"use client";

import { useRef } from "react";
import { TikTokIcon } from "./PlatformIcons";

/**
 * Mockup TikTok — vertical 9:16. Affiche en autoplay muet/loop le teaser
 * Replikr (extrait court de la vidéo de présentation), comme s'il avait
 * été republié sur TikTok par Replikr. Les boutons d'action et la légende
 * sont conservés par-dessus la vidéo pour le rendu natif.
 *
 * La vidéo démarre à 30 s (le début est moins percutant) et y revient
 * en boucle. Le `#t=30` dans src est un media fragment standard
 * (RFC 7233/W3C Media Fragments) — la 1re lecture commence à 30 s.
 * Pour que le loop reparte aussi à 30 s (et pas à 0), on intercepte
 * `onTimeUpdate` : dès qu'on dépasse 60 s on rewind à 30 → loop net
 * de 30 s. `onLoadedMetadata` force le positionnement initial au cas
 * où le browser ignorerait le fragment URL.
 */
const VIDEO_START_S = 30;
const VIDEO_LOOP_END_S = 60;

export default function TikTokPost() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <article className="w-full bg-surface rounded-xl border border-line overflow-hidden text-left">
      {/* Vidéo verticale 9:16 */}
      <div
        className="relative bg-ink mx-auto"
        style={{ aspectRatio: "9 / 16", maxHeight: "220px" }}
      >
        {/* Teaser vidéo en arrière-plan */}
        <video
          ref={videoRef}
          src={`/teaser.mp4#t=${VIDEO_START_S}`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={(e) => {
            e.currentTarget.currentTime = VIDEO_START_S;
          }}
          onTimeUpdate={(e) => {
            if (e.currentTarget.currentTime >= VIDEO_LOOP_END_S) {
              e.currentTarget.currentTime = VIDEO_START_S;
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Gradient bas → top pour rendre la légende lisible sur la vidéo */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

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
        <div className="absolute top-3 right-3 z-10">
          <div className="w-6 h-6 bg-cream/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <TikTokIcon size={12} />
          </div>
        </div>
      </div>
    </article>
  );
}
