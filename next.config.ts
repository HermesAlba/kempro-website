import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
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
