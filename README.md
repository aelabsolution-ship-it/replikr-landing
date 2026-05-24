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

## Déploiement Vercel

### Une seule fois — création du projet Vercel

1. Pousser le projet sur GitHub (nouveau repo `replikr-landing`) :
   ```bash
   cd "f:/Claude code/replikr-landing"
   git init
   git add .
   git commit -m "Initial commit : landing Next.js"
   gh repo create aelabsolution-ship-it/replikr-landing --public --source=. --push
   ```

2. Aller sur https://vercel.com/new
3. Importer le repo `replikr-landing`
4. Framework auto-détecté : **Next.js**, aucune config à toucher
5. Cliquer **Deploy** — premier déploiement en ~90s

### Configuration du domaine `replikr.app`

1. Dans le projet Vercel : **Settings → Domains**
2. Add `replikr.app` et `www.replikr.app`
3. Suivre les instructions DNS chez ton registrar
   (probablement Hostinger) : ajouter un `A` record sur `@` vers
   l'IP fournie par Vercel + un `CNAME` sur `www` vers `cname.vercel-dns.com`
4. Vercel provisionne automatiquement le certificat SSL Let's Encrypt
5. Une fois propagé (5 min à 1h), la landing est en ligne

### Déploiements suivants

Chaque `git push origin main` redéploie automatiquement la production.
Les PR génèrent un preview deploy (URL `replikr-landing-<sha>.vercel.app`).

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
