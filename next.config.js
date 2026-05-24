/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
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
