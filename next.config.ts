import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Baseline security headers (OWASP Secure Headers Project) applied to
// every route, including /studio — none of these break Sanity Studio.
// CSP is defined separately per route group below since Studio (a heavy
// client app using styled-components, blob: previews, websockets for
// live editing, and same-origin iframes for the Presentation tool) needs
// a much looser policy than the public marketing site.
const BASE_SECURITY_HEADERS = [
  // 2 years, includeSubDomains + preload — the OWASP-recommended baseline
  // (Vercel's own default HSTS omits includeSubDomains/preload).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Camera/mic/geolocation aren't used anywhere on the site.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Same-origin framing only (Studio's Presentation tool embeds the
  // public site's own pages in an iframe — same origin, still allowed).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

// Public site CSP: allows only the third-party origins the site actually
// calls — Sanity's image CDN, Google Analytics (gated behind cookie
// consent, see components/cookie-consent/google-analytics.tsx), and
// reCAPTCHA v3 (components/contact/contact-form.tsx). 'unsafe-inline' on
// script-src is required for Next.js's own streaming/hydration inline
// scripts and the GA bootstrap snippet; nonce-based CSP would remove it
// but needs per-request nonce plumbing through every next/script call,
// which isn't in place yet. script-src still blocks any *other* origin,
// which is what stops the overwhelming majority of real-world injected-
// script XSS payloads. JSON-LD <script type="application/ld+json"> tags
// are inert data, not executed script, so CSP does not affect them.
const PUBLIC_SITE_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.sanity.io https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.sanity.io https://cdn.sanity.io",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

// Studio CSP: intentionally permissive — Sanity Studio is an
// authenticated internal tool (not public marketing content), and
// locking it down to the same policy as the public site breaks its own
// styling engine, live-preview iframe, and realtime connections.
// Still blocks plugins (object-src) and is scoped to https/wss only.
const STUDIO_CSP = [
  "default-src 'self' https: wss: blob: data:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https: wss:",
  "worker-src 'self' blob:",
  "frame-src 'self' https:",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...BASE_SECURITY_HEADERS, { key: "Content-Security-Policy", value: PUBLIC_SITE_CSP }],
      },
      {
        // Matched second so its Content-Security-Policy overrides the
        // one set above for the same path (Next.js merges per-key,
        // later matching entries win) — the other baseline headers from
        // the block above still apply to /studio too.
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: STUDIO_CSP }],
      },
    ];
  },
  async redirects() {
    return [
      // Search Console flagged this URL as a 404 (Sept 2026 "Nuevos motivos
      // que impiden que se indexen páginas..." report): it combines the EN
      // locale with the ES slug value for the
      // "construccion-optimizacion-viajes-corporativos" case study (see
      // lib/data/case-studies.ts) — likely a stale external/indexed link
      // rather than anything the site itself still generates (the sitemap
      // and locale-switcher both already resolve this case study's EN slug
      // correctly). Redirect straight to the real EN URL instead of leaving
      // it a dead link.
      {
        source: "/en/customer-stories/optimizacion-viajes-corporativos-ventanas-puertas",
        destination: "/en/customer-stories/corporate-travel-optimization-windows-doors",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
