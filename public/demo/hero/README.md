# Source des exemples

## Version actuelle : moteur d’infographies et publication

`infographie-tournage.html` est généré par `modules.infographic_templates.build_html`, modèle `avant_apres`, style `papier`, polices Inter (servies localement), sans modifier la mise en page du moteur. La matière vient du dictionnaire `DATA` de `scripts/render_infographic_type_previews.py` du dépôt de l’app, avec un titre, un sous-titre et un CTA adaptés. `infographie-tournage.webp` est son export complet à 1080 × 1350, qualité 96.

Reproduction : `work/build-hero-infographic.py` dans le workspace parent. Les icônes de `networks/` sont copiées de `reflex_app/assets/icons/networks/`.

La source PDF, le texte associé, la conversation et l’envoi sont une démonstration animée. Aucun nouvel appel à un modèle d’IA, aucune publication réelle. Le schéma final illustre l’envoi et reprend les contrôles de `page_notebook.py` : sélection des réseaux, Programmer, Publier maintenant, Envoi, confirmation en ligne.


## Version précédente : visuel de la landing et chat agrandi

`infographie-linkedin.webp` est une conversion WebP (qualité 96, dimensions originales 1024 × 1024) de `public/imagepost.png`, déjà présent dans les assets de la landing. Le visuel entier est conservé. La retouche du chat porte uniquement sur le texte de publication qui l’accompagne. Document et conversation sont une démonstration mise en scène, sans nouvel appel à un modèle.

Les éléments décrits ci-dessous appartiennent aux versions précédentes.

## Version du 6 octobre : interface continue

- `post-original.html` et `post-retouche.html` sont produits par le moteur réel de Replikr : `modules.image_presets.build_html`, preset `titre`, thème `creme`, ratio `1:1`, Inter. Les WebP associés sont des exports de ces pages en 1080 × 1080 ; ils évitent un recalcul de la typographie pendant l’animation.
- Le corps du post est une adaptation courte du sujet du carrousel archivé. Les accroches avant/après illustrent la retouche ; aucun appel à un modèle d’IA n’a été effectué pour cette nouvelle démo.
- Le carrousel affiché vient de `public/carousel/8.png`, original 1080 × 1350 (couverture de la série, malgré son nom de fichier).
- L’interface est reconstruite d’après `page_notebook.py`, `assistant.py` et `theme.py` de l’app du 3 octobre : Ressources, Assistant central, Créer/aperçu et barre de formats.
- Le document et la conversation sont mis en scène. Ce n’est pas un enregistrement d’une nouvelle génération.

## Anciens recadrages (inutilisés dans le hero)

Visuels extraits des captures existantes de Replikr :
- post.webp : screens/post_chat.webp, rectangle 338,80,339,424.
- carousel.webp : screens/carrousel.webp, rectangle 347,89,421,526.
- infographic.webp : screens/infographie.webp, rectangle 338,80,418,523.

Ces fichiers sont conservés pour l’historique de la maquette.
