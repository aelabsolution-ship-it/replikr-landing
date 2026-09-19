# Replikr landing

Landing publique de **https://replikr.io**. Les boutons de connexion et d’essai ouvrent **https://app.replikr.io**.

## Base de la page

La présentation reprend https://www.aelabsolution.com/replikr : structure, styles, captures et vidéos, avec des adaptations limitées à l’offre SaaS et au notebook.

- `content/replikr.html` : contenu HTML statique relu, rendu au moment du build par `app/page.tsx`. Aucune donnée de visiteur ni page distante n’est injectée.
- `public/reference/` : styles et médias copiés de la référence, servis localement. Aucun téléchargement de la page Aelab n’est nécessaire au build ou à l’affichage.
- `app/replikr.css` : adaptations SaaS et responsive, après les styles de référence.
- `components/LandingEnhancements.tsx` : menu mobile et animations au défilement. La FAQ utilise des éléments HTML natifs ; les vidéos gardent leurs contrôles.
- `app/layout.tsx` : métadonnées et polices de la référence, servies par Next.js.

Les anciens composants restent dans le dépôt, mais ne sont plus utilisés par la page d’accueil. Les dépendances et leur fichier de verrouillage sont conservés.

## Développement et validation

`npm ci`

`npm run dev`

`npm run build`

Pour prévisualiser la compilation sous Windows : `npx next start -p 3100`.

Contrôler la page sur ordinateur et téléphone, le menu mobile, les réponses de FAQ, les vidéos et les liens vers l’application avant publication.

## Déploiement

La configuration Railway existante est conservée dans `railway.json`. Selon la configuration documentée précédemment dans ce dépôt, un push sur `main` déclenche le déploiement. Vérifier ensuite la fin du déploiement et la page publique ; un push réussi ne prouve pas à lui seul que le site est à jour.

La landing n’exige aucune variable secrète ni base de données. Elle ne modifie pas le SaaS.
