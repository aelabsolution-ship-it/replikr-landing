import type { MetadataRoute } from "next";

// Tout est public, sauf les fragments de démo et le kit d'affiliation (fichiers internes).
const disallow = ["/demo/*.html", "/kit/"];

// Robots des IA explicitement autorisés, comme sur aelabsolution.com
// (référencement dans ChatGPT, Claude, Perplexity, Gemini).
const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: "https://www.hybana.com/sitemap.xml",
  };
}
