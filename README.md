# Replikr landing

Landing publique de **https://replikr.io**. Les boutons de connexion et d’essai ouvrent **https://app.replikr.io**.

## Base de la page

La présentation reprend https://www.aelabsolution.com/replikr : structure, styles, captures et vidéos, avec des adaptations limitées à l’offre SaaS et au notebook.

- `content/replikr.html` : contenu HTML statique relu, rendu au moment du build par `app/page.tsx`. Aucune donnée de visiteur ni page distante n’est injectée.
- `public/reference/` : styles et médias copiés de la référence, servis localement. Aucun téléchargement de la page Aelab n’est nécessaire au build ou à l’affichage.
- `app/replikr.css` : adaptations SaaS et responsive, après les styles de référence.
- `components/LandingEnhancements.tsx` : menu mobile et animations au défilement. La FAQ utilise des éléments HTML natifs ; les vidéos démarrent à l’écran sans boutons de lecture.
- `content/hero-product-motion.html`, `components/HeroProductMotion.tsx`, `app/hero-motion.css` : démonstration de 35 secondes dans un écran fixe, d’après le notebook du 3 octobre (`page_notebook.py`, `assistant.py`, `theme.py`). Dépôt du PDF, clic sur Produire, infographie illustrée et texte associé, puis retouche du texte et publication simulée sur trois réseaux. Le véritable champ du chat s’agrandit pendant la saisie et revient dans sa colonne après l’envoi. Les points de clic sont mesurés une fois à la construction de la séquence. Promesse à gauche et animation compacte à droite sur ordinateur ; empilement sur tablette/téléphone. Pause hors écran/onglet masqué ; résultat immobile si réduction des animations. Pas de zoom global, de commandes de lecture ni de sous-titres extérieurs.
- `public/demo/hero/infographie-tournage.webp` : export complet 1080 × 1350 du vrai moteur `modules.infographic_templates.build_html`, modèle `avant_apres`, style `papier`. Matière reprise des exemples du produit (`render_infographic_type_previews.py`), polices Inter locales. HTML source conservé à côté. La conversation et la publication sont mises en scène : aucun appel à une IA ni envoi réel sur les réseaux. Les icônes de réseaux sont celles de l’app. Les anciens visuels restent archivés et ne sont plus affichés dans le hero.
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

## À reprendre lors de la prochaine refonte

Décision de Ludovic du 6 octobre 2026 : différer le cas utilisateur détaillé (« Comment [prénom] utilise Replikr dans son activité »). Les avis actuels viennent de vrais utilisateurs, qui ne sont pas encore sur une offre payante. Conserver ces avis ; ne pas mettre une personne en avant dans un portrait dédié pour le moment.

Lors d’une prochaine refonte, envisager un cas avec son document de départ, les publications réellement obtenues et son retour, après accord de l’utilisateur concerné. Les éventuels résultats chiffrés devront être documentés.
