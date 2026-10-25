import { ogSize, renderOgImage } from "@/lib/og/render";

export const alt = "Affiliation Hybana : recommandez Hybana, touchez 20 % pendant 12 mois.";
export const size = ogSize;
export const contentType = "image/png";

// Le titre du héros de /affiliation.
export default function Image() {
  return renderOgImage({ line1: "Recommandez Hybana.", line2: "Touchez 20 % pendant 12 mois.", fontSize: 70 });
}
