import "./src/env.js";

/** @type {import("next").NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const config = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            // unsafe-eval only needed in dev (HMR / fast-refresh)
            `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://app.posthog.com`,
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            // Stripe domains added now so Story 5.1 doesn't break
            "connect-src 'self' https://app.posthog.com https://*.sentry.io https://js.stripe.com https://api.stripe.com",
          ].join("; "),
        },
      ],
    },
  ],
};

export default config;
