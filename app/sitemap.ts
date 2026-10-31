import type { MetadataRoute } from "next";

// Les pages publiques du site. Mentions légales, CGV et confidentialité
// redirigent vers l'app (app.hybana.com), les liens /v/* vers le tracker : hors de ce sitemap.
// Une nouvelle page publique = une ligne ici.
const pages = ["/", "/entreprises", "/affiliation"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({ url: `https://www.hybana.com${page === "/" ? "" : page}`, lastModified: new Date() }));
}
