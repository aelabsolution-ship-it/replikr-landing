// Lien court des descriptions YouTube : hybana.com/v/<video>.
// Le clic est compté par le tracker d'aelabsolution.com (/go/<video>-hybana,
// Sheet « Clics Aelab »), qui renvoie ensuite ici avec les UTM
// (utm_campaign=<video>) : on ne fait que passer la main, sans rien compter
// de notre côté. Un slug inconnu du tracker y est servi quand même vers
// Hybana (lienHybanaImplicite dans server.js du site).
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TRACKER = "https://www.aelabsolution.com/go";
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = ((await params).slug || "").toLowerCase();
  // Slug malformé : directement l'accueil, sans passer par le tracker.
  if (!SLUG.test(slug) || slug.length > 70) {
    return NextResponse.redirect("https://www.hybana.com/", 302);
  }
  const cible = new URL(`${TRACKER}/${slug}-hybana`);
  // ?s=commentaire (commentaire épinglé, bio…) devient utm_medium côté tracker.
  const s = req.nextUrl.searchParams.get("s");
  if (s) cible.searchParams.set("s", s.slice(0, 40));
  const res = NextResponse.redirect(cible, 302);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
