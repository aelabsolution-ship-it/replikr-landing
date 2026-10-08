"""Construit public/kit/replikr-kit-affiliation.zip à partir des médias du site.

Le kit de partage des affiliés (bouton « Télécharger le kit » de
app.hybana.com/affiliation). À relancer quand une vidéo ou une capture change :

  python scripts/build_kit.py
"""
import io
import zipfile
from pathlib import Path

from PIL import Image

PUB = Path(__file__).resolve().parent.parent / "public"
APP_ICON = PUB / "logo-512.png"
OUT = PUB / "kit" / "replikr-kit-affiliation.zip"
ROOT = "Hybana - Kit affilie/"

README = """KIT AFFILIÉ HYBANA
===================

Votre lien d'affiliation est dans votre espace :
https://app.hybana.com/affiliation

CE QUE CONTIENT CE DOSSIER
- Logo : le logo Hybana en PNG (fond transparent).
- Vidéos : présentation (16:9), démo verticale pour Reels / TikTok / Shorts (9:16),
  animation (4:5) et les trois étapes en carré (1:1).
- Captures : des écrans de l'application.
- Exemple de carrousel : un carrousel créé avec Hybana.

LA MENTION OBLIGATOIRE
Chaque publication qui contient votre lien doit dire que vous êtes rémunéré
(loi n° 2023-451 du 9 juin 2023). Par exemple :
  « Lien affilié : je touche une commission si vous vous abonnez à Hybana.
    Vous, vous avez -10 % pendant 12 mois. »
Placez-la à côté du lien, visible sans cliquer sur « voir plus ».

UTILISER LE LOGO ET LES VIDÉOS
- Uniquement pour parler de Hybana et partager votre lien.
- Sans modifier le logo (couleurs, proportions, texte).
- Sans vous présenter comme Hybana : pas de compte, de page ou de nom de
  domaine qui reprend la marque, pas de publicité sur le mot « Hybana ».

Conditions complètes : https://app.hybana.com/legal/affiliation
Une question : ludovic.nedelec@aelabsolution.com
"""

VIDEOS = {
    "presentation.mp4": "Videos/presentation-16x9.mp4",
    "teaser.mp4": "Videos/demo-verticale-9x16.mp4",
    "videos/hero.mp4": "Videos/animation-4x5.mp4",
    "videos/etape1_m.mp4": "Videos/etape-1-deposez-1x1.mp4",
    "videos/etape2_m.mp4": "Videos/etape-2-generez-1x1.mp4",
    "videos/etape3_m.mp4": "Videos/etape-3-publiez-1x1.mp4",
}


def jpg_bytes(path: Path) -> bytes:
    buf = io.BytesIO()
    Image.open(path).convert("RGB").save(buf, "JPEG", quality=90, optimize=True)
    return buf.getvalue()


OUT.parent.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(OUT, "w") as z:
    z.writestr(ROOT + "LISEZ-MOI.txt", "﻿" + README.replace("\n", "\r\n"),
               zipfile.ZIP_DEFLATED)
    z.write(APP_ICON, ROOT + "Logo/replikr-logo.png", zipfile.ZIP_STORED)
    for src, dst in VIDEOS.items():
        z.write(PUB / src, ROOT + dst, zipfile.ZIP_STORED)
    for webp in sorted((PUB / "screens").glob("*.webp")):
        z.writestr(ROOT + f"Captures/{webp.stem}.jpg", jpg_bytes(webp), zipfile.ZIP_STORED)
    for png in sorted((PUB / "carousel").glob("*.png"), key=lambda p: int(p.stem)):
        z.writestr(ROOT + f"Exemple de carrousel/slide-{png.stem}.jpg", jpg_bytes(png),
                   zipfile.ZIP_STORED)

with zipfile.ZipFile(OUT) as z:
    names = z.namelist()
print(len(names), "fichiers,", round(OUT.stat().st_size / 1e6, 1), "Mo")
for n in names:
    print(" ", n)
