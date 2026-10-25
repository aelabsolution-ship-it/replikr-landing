// Données structurées de l'accueil (schema.org SoftwareApplication).
// Volontairement sans prix (affichage HT/TTC pas encore tranché) et sans note ni avis.
const data = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hybana",
  description: "Hybana transforme votre expertise en posts et en images pour attirer vos futurs clients. Partez de vos documents, vidéos ou notes vocales.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://www.hybana.com",
  inLanguage: "fr",
  publisher: { "@type": "Organization", name: "Aelab Solution", url: "https://www.aelabsolution.com" },
};

export default function SoftwareJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }} />;
}
