# Replikr Landing

Landing page marketing pour **Replikr** (replikr.app) — visiteur froid uniquement.
Le login client est un lien discret en haut à droite qui redirige vers l'app
Streamlit (replikr.io).

## Stack

- **Next.js 14** (App Router)
- **TypeScript** strict
- **Tailwind CSS** 3
- **Framer Motion** — fade-in du H1 mot par mot
- **GSAP + ScrollTrigger** — animation sticky de la Section 2 (vidéo → 6 posts)
- **Fonts** : Newsreader Italic (serif titres) + Inter (sans body), via `next/font`

## Direction artistique (NE PAS dévier)

- Fond crème uniforme **#F4EFE6**
- Texte principal **#1A1612**, secondaire **#5C5249**
- Accent violet unique **#6B4FE8**
- 2 graisses uniquement (400, 500)
- Aucun gradient, aucune ombre portée, aucun glassmorphism
- Beaucoup d'air entre sections (100vh chacune)

## Structure (5 sections + nav + footer)

| # | Section | Comportement |
|---|---|---|
| 1 | **Hero** | H1 fade-in mot par mot · CTA noir · vidéo + thumbnails préview |
| 2 | **Démo** | Sticky 250vh · GSAP ScrollTrigger · 6 cards posts émergent de la vidéo centrale (stagger 80ms, ease power3.out) |
| 3 | **Contraste** | 3 lignes serif italiques avec respiration verticale |
| 4 | **Comment** | 3 étapes numérotées (chiffres serif italique violet) |
| 5 | **CTA final** | Centré plein écran · "Prêt à publier dix fois ?" + bouton |

## Démarrage local

```bash
cd "f:/Claude code/replikr-landing"
npm install
npm run dev
```

Ouvre http://localhost:3000.

## Build production

```bash
npm run build
npm start
```

## Déploiement Railway

Cohérence avec `replikr.io` (multicanal) : tout sur Railway, région
`europe-west4` (Amsterdam). Config dans `railway.json`.

### Une seule fois — création du service Railway

1. Le repo est déjà sur GitHub : https://github.com/aelabsolution-ship-it/replikr-landing
2. Aller sur https://railway.app/new
3. Choisir **Deploy from GitHub repo** → sélectionner `replikr-landing`
4. Railway détecte automatiquement Next.js via Nixpacks
5. Variables d'environnement : aucune nécessaire pour la landing publique
6. Premier déploiement automatique (~3 min : build Docker + npm install + next build)
7. URL temporaire fournie : `replikr-landing-production.up.railway.app`

### Configuration du domaine `replikr.app`

1. Dans le service Railway : **Settings → Networking → Custom Domain**
2. Add `replikr.app` (et `www.replikr.app` séparément si besoin)
3. Railway fournit un `CNAME` cible (genre `xxxxx.up.railway.app`)
4. Chez le registrar du domaine `replikr.app` :
   - `CNAME` `@` → la cible Railway
   - `CNAME` `www` → la cible Railway
   - (Si le registrar interdit CNAME sur `@`, utiliser un `ALIAS`/`ANAME`)
5. SSL Let's Encrypt auto-provisionné par Railway
6. Propagation 5 min à 1h, vérifier avec `dig replikr.app`

### Déploiements suivants

Chaque `git push origin main` redéploie automatiquement la production.
Build durée ~3 min sur Railway (peut être plus rapide si le cache des
dépendances est chaud).

### Spécificités du `package.json` pour Railway

Le script `start` est `next start -p ${PORT:-3000}` : Railway injecte
sa propre variable `PORT`, on l'utilise. En local, fallback sur 3000.

## Variables d'environnement

Aucune n'est nécessaire pour la landing publique (pas d'API, pas de DB).

## Anti-spec — ce qui est interdit

- ❌ Feature grid avec icônes Lucide
- ❌ "Trusted by" avec faux logos
- ❌ Testimonials inventés
- ❌ Gradient violet→rose (la v1 en avait, on l'a supprimé)
- ❌ Stat cards "X% de temps gagné"
- ❌ Cookie banner immédiat (RGPD géré en bandeau discret délai 2s)
- ❌ Modal popup de sortie

## Liens

- App produit : https://replikr.io (Streamlit, repo `multicanal`)
- Ancienne landing HTML : `f:/Claude code/replikr-landing-old/` (Netlify)
- Contact : ludovic.nedelec@aelabsolution.com
