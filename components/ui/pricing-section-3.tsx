"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const plans = [
  {
    name: "Gratuit", price: 0, annual: 0, annualMonthly: 0, credits: "60 crédits offerts", recharge: 0,
    description: "Testez sur vos propres contenus. Sans carte bancaire.",
    features: ["1 marque", "3 sources par notebook", "Posts, images, infographies et scripts", "Tournage et téléchargement du rush brut"],
    excluded: ["Carrousels illustrés", "Montage et sous-titres", "Publication et programmation", "Stockage vidéo", "Recharge de crédits"],
    note: "Crédits offerts une seule fois, sans renouvellement.", featured: false, free: true,
  },
  {
    name: "Replikr", price: 35, annual: 348, annualMonthly: 29, credits: "410 crédits / mois", recharge: 110,
    description: "Créez vos contenus et téléchargez-les pour les publier vous-même.",
    features: ["1 marque", "6 sources par notebook", "Tous les formats, dont les carrousels", "Montage et sous-titres des shorts", "Copier et télécharger"],
    excluded: ["Publication et programmation", "Stockage vidéo"],
    note: "", featured: false, free: false,
  },
  {
    name: "Replikr + publication", price: 66, annual: 660, annualMonthly: 55, credits: "660 crédits / mois", recharge: 150,
    description: "Créez, programmez et publiez depuis un seul endroit.",
    features: ["1 marque", "6 sources par notebook", "Tous les formats, montage et sous-titres", "Publication directe sur vos réseaux", "Programmation dans le calendrier", "2 vidéos conservées par notebook"],
    excluded: [], note: "", featured: true, free: false,
  },
  {
    name: "Agence", price: 359, annual: 3588, annualMonthly: 299, credits: "4 470 crédits / mois", recharge: 190,
    description: "Accompagnez plusieurs marques dans le même espace.",
    features: ["10 marques", "6 sources par notebook", "Tous les formats, montage et sous-titres", "Publication et programmation", "2 vidéos conservées par notebook"],
    excluded: [], note: "", featured: false, free: false,
  },
];

// Deux mois offerts : 348 € au lieu de 12 × 35 €.
const SAVING = Math.round((1 - plans[1].annual / (plans[1].price * 12)) * 100);

const euros = (n: number) => Math.round(n).toLocaleString("fr-FR");

/** Le prix passe d'un montant à l'autre en défilant, sans sauter d'un coup. */
function Amount({ value }: { value: number }) {
  const still = useReducedMotion();
  const raw = useMotionValue(value);
  const spring = useSpring(raw, { stiffness: 220, damping: 30 });
  const text = useTransform(spring, (v) => euros(v));

  useEffect(() => {
    if (still) spring.jump(value);
    else raw.set(value);
  }, [value, still, raw, spring]);

  return (
    <>
      <span className="rk-card__amount-sr">{euros(value)}</span>
      <motion.span className="rk-card__amount" aria-hidden="true">{text}</motion.span>
    </>
  );
}

// Ce qui distingue vraiment les offres — l'essai compris, pour qu'on voie tout
// de suite ce qu'il permet et ce qu'il ne permet pas.
const PLAN_NAMES = ["Gratuit", "Replikr", "+ publication", "Agence"];
type Cell = string | boolean;
const COMPARE: { label: string; values: Cell[] }[] = [
  { label: "Crédits", values: ["60 une seule fois", "410 par mois", "660 par mois", "4 470 par mois"] },
  { label: "Recharge de 5 €", values: [false, "110 crédits", "150 crédits", "190 crédits"] },
  { label: "Sources par notebook", values: ["3", "6", "6", "6"] },
  { label: "Analyser une source", values: [true, true, true, true] },
  { label: "Post avec image, infographie, script", values: [true, true, true, true] },
  { label: "Carrousel illustré", values: [false, true, true, true] },
  { label: "Filmer et télécharger le rush brut", values: [true, true, true, true] },
  { label: "Montage et sous-titres des shorts", values: [false, true, true, true] },
  { label: "Vidéos conservées par notebook", values: ["Aucune", "Aucune", "2", "2"] },
  { label: "Publier et programmer", values: [false, false, true, true] },
  { label: "Marques", values: ["1", "1", "1", "10"] },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const periods: { key: boolean; label: string }[] = [
    { key: false, label: "Mensuel" },
    { key: true, label: "Annuel" },
  ];

  return (
    <section className="section oi-cta rk-pricing" id="essai" aria-labelledby="pricing-title">
      <div className="container">
        <span className="eyebrow">Essayez Replikr</span>
        <h2 id="pricing-title">Ajoutez votre matière.<br />Regardez ce qui en sort.</h2>
        <p>Une vidéo, un document ou une note : commencez avec votre propre contenu et découvrez ce que Replikr vous aide à en faire.</p>
        <p className="rk-pricing__trial"><strong>60 crédits d’essai offerts</strong><span>Sans carte bancaire et sans engagement.</span></p>

        <div className="rk-pricing__switch" role="group" aria-label="Période de facturation">
          {periods.map((p) => (
            <button key={p.label} type="button" aria-pressed={annual === p.key}
                    onClick={() => setAnnual(p.key)}>
              {annual === p.key && (
                <motion.span layoutId="rk-pricing-pill" className="rk-pricing__pill"
                             transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="rk-pricing__switch-label">
                {p.label}
                {p.key && <span className="rk-pricing__save">−{SAVING} %</span>}
              </span>
            </button>
          ))}
        </div>

        <div className="rk-pricing__value">
          <div><strong>Replikr + publication</strong><span>Tout le parcours, de l’idée au post publié.</span></div>
          <div><strong>+61 %</strong><span>de crédits par mois</span></div>
          <div><strong>150 crédits</strong><span>pour une recharge de 5 €</span></div>
          <div><strong>Publication incluse</strong><span>et programmation dans le calendrier</span></div>
        </div>
        <p className="rk-pricing__value-note">Comparé à Replikr : +250 crédits par mois pour {annual ? "26" : "31"} €/mois de plus.</p>
        <div className="rk-pricing__grid" aria-label="Les offres Replikr" aria-live="polite" aria-atomic="true">
          {plans.map((plan) => (
            <article key={plan.name} className={`rk-card${plan.featured ? " rk-card--featured" : ""}${plan.free ? " rk-card--free" : ""}`}>
              <div className="rk-card__head">
                <span className="rk-card__badge">{plan.featured ? "RECOMMANDÉ · CRÉER ET PUBLIER" : plan.free ? "DÉCOUVRIR" : ""}</span>
                <p className="rk-card__price">
                  <Amount value={annual ? plan.annualMonthly : plan.price} />
                  <span>{plan.free ? "€" : "€/mois"}</span>
                </p>
                <p className="rk-card__annual">
                  {plan.free ? "Sans carte bancaire" : annual ? `${euros(plan.annual)} € facturés par an` : "Facturation mensuelle"}
                </p>
                <h3>{plan.name}</h3>
                <p className="rk-card__description">{plan.description}</p>
              </div>
              <div className="rk-card__credits"><strong>{plan.credits}</strong>{plan.featured && <span>+250 crédits par mois · +61 %</span>}</div>
              <ul className="rk-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}><span aria-hidden="true" className="rk-card__check">✓</span>{feature}</li>
                ))}
                {plan.excluded.map((feature) => (
                  <li key={feature} className="rk-card__excluded"><span aria-hidden="true">−</span><span>{feature}<span className="rk-sr-only"> : non inclus</span></span></li>
                ))}
              </ul>
              {plan.note && <p className="rk-card__note">{plan.note}</p>}
              <div className="rk-card__recharge"><span>RECHARGE DE CRÉDITS</span><strong>{plan.free ? "Non disponible" : `5 € = ${plan.recharge} crédits`}</strong>{plan.featured && <small>36 % de crédits en plus qu’avec Replikr</small>}</div>
              <a className="rk-card__button" href="https://app.replikr.io"
                 aria-label={plan.free ? "Commencer gratuitement" : `Choisir ${plan.name}`}>
                {plan.free ? "Commencer gratuitement" : plan.featured ? "Choisir Créer + Publier" : "Choisir cette offre"}<span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <table className="rk-compare">
          <caption>Ce qui change d’une offre à l’autre</caption>
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col">Gratuit · 0 €</th>
              <th scope="col">Replikr</th>
              <th scope="col">+ publication</th>
              <th scope="col">Agence</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((v, i) => (
                  <td key={i} data-plan={PLAN_NAMES[i]}>
                    {v === true ? <span className="rk-compare__yes" aria-label="Inclus">✓</span>
                     : v === false ? <span className="rk-compare__no" aria-label="Non inclus">—</span>
                     : v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="rk-pricing__caption">Commencez par l’essai gratuit. Choisissez votre offre ensuite.</p>
        <p className="rk-pricing__caption">En gratuit, filmez et téléchargez le rush brut sur votre appareil, sans montage, sous-titres ni stockage dans Replikr.</p>
      </div>
    </section>
  );
}
