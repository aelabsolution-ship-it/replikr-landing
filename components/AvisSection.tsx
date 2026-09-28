import { StaggerTestimonials, type StaggerTestimonial } from "@/components/ui/stagger-testimonials";

type Avis = StaggerTestimonial & {
  /** Avis rédigé pour la maquette, pas encore validé par l'utilisatrice. */
  provisoire?: boolean;
};

// Avis validés : Fatimata, Maxime et François (26 sept. 2026), Nadia et Arthur (27 sept.), Jessica
// (28 sept.). Catherine est un brouillon en attente de validation : il n'apparaît jamais en production.
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
    // Avis réel de Jessica (28 sept.), extrait mot pour mot.
    name: "Jessica",
    role: "System designer",
    testimonial: "Entre le manque de temps et le manque de connaissances pour créer du contenu vraiment pertinent, ce n’est pas toujours évident de s’y tenir. C’est justement là que Replikr fait toute la différence.",
    imgSrc: "/avis/jessica.webp",
  },
  {
    name: "Nadia",
    role: "Entrepreneure IA et digital",
    testimonial: "J’aurais pu construire ce système moi-même. Mais ce n’est pas là que je veux passer mon temps. Replikr repart de ma matière, et je relance Instagram sans devenir quelqu’un d’autre.",
    imgSrc: "/avis/nadia.webp",
  },
  {
    // Avis réel d'Arthur (27 sept.), publication accordée. Extrait mot pour mot de son avis.
    name: "Arthur",
    role: "Conseiller en IA",
    testimonial: "L’interface est fluide. On passe d’une étape à l’autre sans friction. Le calendrier fait la différence. Tous les posts de la semaine apparaissent d’un coup d’œil, jour par jour.",
    imgSrc: "/avis/arthur.webp",
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
