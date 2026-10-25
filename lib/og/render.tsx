import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Image de partage (Open Graph / X), 1200 × 630, dans la charte sombre du site :
// fond presque noir, texte blanc cassé, violet en touche, Inter pour le texte,
// HYBANA en Figtree 500 très espacé. Polices statiques (OFL) lues au build.
export const ogSize = { width: 1200, height: 630 };

const dir = path.join(process.cwd(), "lib/og");
const font = (file: string) => readFileSync(path.join(dir, file));
const logo = `data:image/png;base64,${readFileSync(path.join(process.cwd(), "public/logo-512.png")).toString("base64")}`;

export function renderOgImage({ line1, line2, fontSize = 56 }: { line1: string; line2: string; fontSize?: number }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
        background: "#0b0b0c", padding: "72px 80px", fontFamily: "Inter", color: "#ededed" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={56} height={56} alt="" />
          <span style={{ fontFamily: "Figtree", fontWeight: 500, fontSize: 30, letterSpacing: "0.28em", color: "#ededed" }}>HYBANA</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontWeight: 600, fontSize, lineHeight: 1.1, letterSpacing: "-0.04em" }}>
          <span>{line1}</span>
          <span style={{ color: "#a9abe8" }}>{line2}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #26262a",
          paddingTop: 28, fontSize: 26, fontWeight: 400, color: "#71717a" }}>
          <span>Vos posts et vos visuels, tirés de votre expertise</span>
          <span style={{ color: "#a1a1aa" }}>hybana.com</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: font("Inter-400.woff"), weight: 400, style: "normal" },
        { name: "Inter", data: font("Inter-600.woff"), weight: 600, style: "normal" },
        { name: "Figtree", data: font("Figtree-500.woff"), weight: 500, style: "normal" },
      ],
    },
  );
}
