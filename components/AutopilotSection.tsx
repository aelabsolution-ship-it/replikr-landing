import {
  LinkedInIcon,
  XIcon,
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  ThreadsIcon,
  FacebookIcon,
} from "./mockups/PlatformIcons";

/**
 * Section Autopilot : insérée entre la démo et "Trois étapes".
 *
 * Promesse centrale : la publication automatique multi-réseaux. C'est la
 * feature qui différencie Replikr des outils de repurposing classiques
 * (Klap, OpusClip, Repurpose.io) qui s'arrêtent à la génération.
 *
 * Visuel : nœud central Replikr + 7 logos disposés en cercle autour,
 * lignes SVG reliant chaque logo au centre. Badge "Programmé pour 18h47"
 * en orbite pour suggérer la programmation auto.
 */

type Platform = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  angle: number;
};

const PLATFORMS: Platform[] = [
  { Icon: YouTubeIcon, label: "YouTube Shorts", angle: -90 },
  { Icon: LinkedInIcon, label: "LinkedIn", angle: -38 },
  { Icon: XIcon, label: "X", angle: 14 },
  { Icon: FacebookIcon, label: "Facebook", angle: 66 },
  { Icon: TikTokIcon, label: "TikTok", angle: 118 },
  { Icon: InstagramIcon, label: "Instagram", angle: 170 },
  { Icon: ThreadsIcon, label: "Threads", angle: 222 },
];

export default function AutopilotSection() {
  const RADIUS = 150;

  return (
    <section id="autopilot" className="rk-section bg-cream">
      <div className="max-w-page mx-auto w-full grid md:grid-cols-2 gap-16 md:gap-20 items-center">
        {/* ── Colonne texte ───────────────────────────────────────── */}
        <div>
          <h2 className="font-serif text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] text-ink mb-8 rk-reveal">
            Vous ne publiez plus.
            <br />
            <span className="text-violet">Replikr publie.</span>
          </h2>

          <p className="text-graphite text-base md:text-lg leading-relaxed max-w-prose rk-reveal">
            Connectez vos comptes une fois. Replikr programme et publie sur
            les 7 réseaux aux créneaux d&apos;audience optimale, sans que vous
            ouvriez une seule app. Vous gardez la main : approbation en un
            clic depuis votre téléphone, ou publication directe en mode
            autopilot.
          </p>

          {/* Mini-liste 3 colonnes */}
          <dl className="mt-10 grid sm:grid-cols-3 gap-6 max-w-2xl rk-reveal">
            <FeatureItem
              title="Mode validation rapide"
              desc="Approbation mobile en un clic."
            />
            <FeatureItem
              title="Mode autopilot"
              desc="Zéro intervention."
            />
            <FeatureItem
              title="Créneaux optimaux"
              desc="Calculés par réseau."
            />
          </dl>
        </div>

        {/* ── Colonne visuelle : hub central + 7 logos en orbite ──── */}
        <div className="relative w-full aspect-square max-w-[460px] mx-auto rk-reveal">
          {/* SVG lignes (sous tout, pointillés discrets) */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            aria-hidden="true"
          >
            {PLATFORMS.map(({ label, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const x = 200 + Math.cos(rad) * RADIUS;
              const y = 200 + Math.sin(rad) * RADIUS;
              return (
                <line
                  key={label}
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="#1A1612"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
              );
            })}
          </svg>

          {/* Hub central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2.5">
            <div className="w-24 h-24 rounded-2xl bg-ink flex items-center justify-center shadow-[0_18px_44px_-18px_rgba(26,22,18,0.45)]">
              <span
                aria-hidden="true"
                className="w-7 h-7 bg-violet rotate-45"
              />
            </div>
            <span className="text-[11px] tracking-[0.18em] uppercase text-graphite text-center leading-tight">
              Replikr
              <br />
              <span className="text-violet">autopilot</span>
            </span>
          </div>

          {/* Badge "Programmé" en orbite */}
          <div
            className="absolute z-20 bg-surface border border-line rounded-full pl-2 pr-3 py-1 flex items-center gap-1.5 shadow-[0_8px_24px_-8px_rgba(26,22,18,0.18)]"
            style={{
              top: "8%",
              right: "4%",
            }}
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-violet/40 animate-ping" />
              <span className="relative rounded-full bg-violet w-2 h-2" />
            </span>
            <span className="text-[11px] font-medium text-ink whitespace-nowrap">
              Programmé · 18:47
            </span>
          </div>

          {/* 7 logos en orbite */}
          {PLATFORMS.map(({ Icon, label, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 50 + (Math.cos(rad) * RADIUS) / 4;
            const cy = 50 + (Math.sin(rad) * RADIUS) / 4;
            return (
              <div
                key={label}
                className="absolute z-10 w-14 h-14 -ml-7 -mt-7 rounded-full bg-surface border border-line flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(26,22,18,0.12)]"
                style={{ left: `${cx}%`, top: `${cy}%` }}
                aria-label={label}
              >
                <Icon size={22} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        .animate-ping { animation: ping 1.8s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </section>
  );
}

function FeatureItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <dt className="text-[14px] font-medium text-ink leading-snug mb-1">
        {title}
      </dt>
      <dd className="text-[13px] text-graphite leading-relaxed">{desc}</dd>
    </div>
  );
}
