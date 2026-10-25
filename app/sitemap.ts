import type { MetadataRoute } from "next";

// Les pages publiques du site. Mentions légales et confidentialité vivent sur
// aelabsolution.com, l'app sur app.hybana.com : hors de ce sitemap.
// Une nouvelle page publique = une ligne ici.
const pages = ["/", "/affiliation"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({ url: `https://www.hybana.com${page === "/" ? "" : page}`, lastModified: new Date() }));
}
