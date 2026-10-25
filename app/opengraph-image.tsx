import { ogSize, renderOgImage } from "@/lib/og/render";

export const alt = "Hybana : vos futurs clients sont sur les réseaux. Vous, vous n’avez pas le temps d’y être.";
export const size = ogSize;
export const contentType = "image/png";

// Le titre du héros de l'accueil (content/replikr.html).
export default function Image() {
  return renderOgImage({ line1: "Vos futurs clients sont sur les réseaux.", line2: "Vous, vous n’avez pas le temps d’y être." });
}
