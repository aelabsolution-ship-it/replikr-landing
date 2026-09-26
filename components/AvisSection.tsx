import { StaggerTestimonials, type StaggerTestimonial } from "@/components/ui/stagger-testimonials";

type Avis = StaggerTestimonial & {
  /** Avis rédigé pour la maquette, pas encore validé par l'utilisatrice. */
  provisoire?: boolean;
};

// Avis validés : Fatimata, Maxime et François (26 sept. 2026). Catherine, Nadia et Jessica
// sont des brouillons en attente de validation : ils n'apparaissent jamais en production.
const AVIS: Avis[] = [
  {
    name: "Fatimata",
    role: "Consultante et architecte CRM",
    testimonial: "Avant, je passais mes dimanches à écrire mes derniers documents. Maintenant je dépose ma dernière vidéo et j’ai tout en 20 minutes. Je relis, j’ajuste deux phrases, c’est prêt.",
    imgSrc: "/avis/fatimata.webp",
  },
  {
    name: "Maxime",
    role: "Webdesigner",
    testimonial: "Une note vocale enregistrée en marchant ce matin, et cet après-midi j’ai mon post LinkedIn et mon carrousel Instagram. Je ne m’attendais pas à ce que ce soit aussi simple.",
  },
  {
    name: "François",
    role: "Consultant SEO",
    testimonial: "Ce qui m’a convaincu, c’est que les textes sonnent comme moi. Mes abonnés n’ont vu aucune différence, sauf que je publie trois fois plus.",
  },
  {
    // À REMPLACER par l'avis réel de Catherine.
    name: "Catherine",
    role: "Consultante IA pour les dirigeants de TPE",
    testimonial: "Les carrousels sont propres dès la première version. Je n’ouvre plus Canva pour ça.",
    imgSrc: "/avis/catherine.webp",
    provisoire: true,
  },
  {
    // À REMPLACER par l'avis réel de Jessica.
    name: "Jessica",
    role: "System designer",
    testimonial: "Le calendrier a tout changé : je prépare ma semaine le lundi matin, tout est programmé, et je n’y pense plus.",
    imgSrc: "/avis/jessica.webp",
    provisoire: true,
  },
  {
    // À REMPLACER par l'avis réel de Nadia.
    name: "Nadia",
    role: "Entrepreneure IA et digital",
    testimonial: "J’avais des dizaines de vidéos qui dormaient. Replikr en a tiré des carrousels, des posts et des scripts courts. Mon contenu travaille enfin pour moi.",
    imgSrc: "/avis/nadia.webp",
    provisoire: true,
  },
];

const publies = AVIS.filter((avis) => !avis.provisoire || process.env.NODE_ENV !== "production");

// Deux avis sans photo ne se suivent jamais : chacun est glissé entre deux avis avec portrait
// (on reprend les portraits s'il en manque). L'ordre de AVIS est choisi pour que Fatimata et
// Jessica ne se suivent pas non plus.
function alterner(liste: Avis[]): Avis[] {
  const avecPhoto = liste.filter((avis) => avis.imgSrc);
  const sansPhoto = liste.filter((avis) => !avis.imgSrc);
  if (!avecPhoto.length) return liste;
  const suite: Avis[] = [];
  const tours = Math.max(avecPhoto.length, sansPhoto.length);
  for (let i = 0; i < tours; i++) {
    if (i < avecPhoto.length || i < sansPhoto.length) suite.push(avecPhoto[i % avecPhoto.length]);
    if (i < sansPhoto.length) suite.push(sansPhoto[i]);
  }
  return suite;
}

const visibles = alterner(publies);

export default function AvisSection() {
  return (
    <section className="section oi-avis" id="avis" aria-labelledby="avis-title">
      <div className="container">
        <h2 id="avis-title">Ils publient avec Replikr.</h2>
      </div>
      <div className="dark oi-avis__stagger">
        <StaggerTestimonials testimonials={visibles} />
      </div>
    </section>
  );
}
