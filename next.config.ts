import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Active le strict mode React (aide à repérer les problèmes)
  reactStrictMode: true,

   outputFileTracingRoot: path.join(__dirname, "../../"), // <-- racine correcte

  // ✅ Active les sourcemaps en production (utile pour déboguer les erreurs)
  productionBrowserSourceMaps: true,

  // ✅ Redirection des appels API du front vers ton backend FastAPI
  async rewrites() {
    return [
      {
        source: "/api/:path*",                // Toute requête /api/* côté front
        destination: "http://127.0.0.1:8000/:path*", // Est redirigée vers FastAPI
      },
    ];
  },

  // ✅ Sécurité supplémentaire (headers HTTP)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
