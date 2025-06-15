/** @type {import('next').NextConfig} */
const isDev = false;
const backendUrl = "localhost";
const prodBackendUrl = process.env.NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL;
const back = isDev ? backendUrl : prodBackendUrl;
const nextConfig = {
  env: {
    NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL:
      process.env.NEXT_VITE_REACT_APP_BACKEND_URL,
    NEXT_HOST: process.env.NEXT_HOST,
  },
  images: {
    // Update to only allow trusted image domains
    domains: [isDev ? "localhost" : "www.static-cms-aline86.fr"],
  },
  reactStrictMode: false,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              isDev
                ? "script-src 'self' 'unsafe-eval' 'unsafe-inline';"
                : "script-src 'self' 'unsafe-inline' https://www.google-analytics.com; ", // Allow unsafe-eval only in dev or Google Analytics
              "style-src 'self' 'unsafe-inline';",
              // Remove localhost and use prod URLs in production
              `img-src 'self' data: https: ${back} www.static-cms-aline86.fr;`,
              // Remove localhost from connect-src for production
              `connect-src 'self' ${back} https://www.google-analytics.com;`,
              "frame-src https://www.youtube.com;",
              "object-src 'none';",
              "base-uri 'self';",
            ]
              .filter(Boolean)
              .join(" "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
