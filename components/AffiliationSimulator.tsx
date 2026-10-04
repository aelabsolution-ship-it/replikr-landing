"use client";

import { useState } from "react";

// Prix TTC des offres (mêmes valeurs que la FAQ de l'accueil). Commission :
// 20 % du hors taxes (TVA française 20 % incluse dans les prix).
const OFFERS = [
  { id: "replikr", label: "Créateur", price: 35 },
  { id: "publication", label: "Solopreneur", price: 66 },
];
const COUNTS = [5, 10, 25, 50];
const RATE = 0.2;
const VAT = 1.2;
// Les clients recommandés ont -10 % : la commission porte sur ce qu'ils paient.
const PAID = 0.9;

const euros = (v: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR",
    maximumFractionDigits: v >= 100 ? 0 : 2, minimumFractionDigits: 0 }).format(v);

export default function AffiliationSimulator() {
  const [offer, setOffer] = useState(OFFERS[0]);
  const [count, setCount] = useState(10);
  const perClient = (offer.price * PAID / VAT) * RATE;
  return (
    <div className="af-sim" aria-live="polite">
      <p className="af-sim__label">Ce que vous pouvez gagner</p>
      <div className="af-seg" role="group" aria-label="Offre de vos clients">
        {OFFERS.map(o => (
          <button key={o.id} type="button" aria-pressed={o.id === offer.id}
            onClick={() => setOffer(o)}>{o.label} · {o.price} €</button>
        ))}
      </div>
      <div className="af-seg" role="group" aria-label="Nombre de clients">
        {COUNTS.map(n => (
          <button key={n} type="button" aria-pressed={n === count}
            onClick={() => setCount(n)}>{n} clients</button>
        ))}
      </div>
      <div className="af-sim__big">{euros(perClient * count)}<span>/mois</span></div>
      <p className="af-sim__caption">une fois vos {count} clients abonnés</p>
      <div className="af-sim__row">
        <div><strong>{euros(perClient * count * 12)}</strong><span>sur leurs 12 premiers mois</span></div>
        <div><strong>{euros(perClient)}</strong><span>par client et par mois</span></div>
      </div>
      <p className="af-sim__foot">Estimation sur des abonnements mensuels, hors taxes, après les -10 % offerts à vos clients.</p>
    </div>
  );
}
