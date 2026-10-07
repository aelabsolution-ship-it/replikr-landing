# Visuels du bloc « Jugez sur ce qu’il produit »

Source : `outputs/fiche-methode-demandes-clients.txt`, document d’exemple préparé pour la démonstration (aucun témoignage, aucun résultat mesuré).

Rendus par les moteurs réels de Replikr, sans appel à un modèle d’IA :
- `carrousel-1` à `carrousel-6` : `modules.carousel_designs.build_slide_html`, design « tuto ».
- `infographie-checklist` : `modules.infographic_templates.build_html`, modèle `checklist`, style « pastel ».
- `infographie-avant-apres` : même moteur, modèle `avant_apres`, style « quadrillé ».

Les textes ont été écrits à partir de la fiche. Les espaces insécables françaises (avant « ? », dans « … ») sont rétablies après coup, car les moteurs remplacent toutes les espaces.
Export 1080 × 1350 réduit à 864 × 1080, WebP qualité 90.

Reproduction : `work/build-proof-visuals.py <dossier> tuto,pastel,quadrille` (depuis le dépôt de l’app), puis `work/shoot-proof-visuals.js <dossier>`.

## Interfaces des téléphones (`ui/`)

`ui/linkedin.webp`, `ui/instagram.webp`, `ui/facebook.webp` : interfaces Android réelles (captures de Ludovic, 693 px de large), nettoyées. Seuls restent la barre d'état, les barres d'outils, les rangées d'actions et la navigation : toutes les zones qui montraient les publications d'autres personnes sont repeintes. Les publications Replikr sont posées par-dessus en HTML, aux coordonnées de la capture (classe `.shot`, échelle `--k`). Aucun compteur de réactions n'est affiché.
Reproduction : `work/build-proof-chrome.js <dossier>` (les captures d'origine ne sont pas dans le dépôt).
