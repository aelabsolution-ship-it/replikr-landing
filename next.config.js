/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Renommage Hybana (oct. 2026) : l'ancien domaine part en 301 vers le
  // nouveau, chemin conservé (replikr.io/confidentialite → www.hybana.com/confidentialite).
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "(www\\.)?replikr\\.io" }],
      destination: "https://www.hybana.com/:path*",
      permanent: true,
    }];
  },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'" },
      { key: "Content-Security-Policy-Report-Only", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https:; font-src 'self' data:; frame-src 'self' https:" },
    ] }];
  },
  // Le dossier de dev vit sur un disque exFAT qui ne supporte pas les
  // symlinks/junctions. Webpack tente de readlink des modules et plante
  // en EISDIR. Désactiver la résolution des symlinks règle le problème
  // sans impact perf en prod (Vercel build sur NTFS Linux, pas concerné).
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

module.exports = nextConfig;
