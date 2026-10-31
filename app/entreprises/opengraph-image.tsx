import { ogSize, renderOgImage } from "@/lib/og/render";

export const alt = "Hybana pour les réseaux de points de vente : chaque point de vente publie, le siège garde la main.";
export const size = ogSize;
export const contentType = "image/png";

// Le titre du héros de /entreprises.
export default function Image() {
  return renderOgImage({ line1: "Chaque point de vente publie.", line2: "Le siège garde la main.", fontSize: 66 });
}
