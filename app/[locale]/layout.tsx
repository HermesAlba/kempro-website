import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsentBanner } from "@/components/cookie-consent/cookie-consent-banner";
import { GoogleAnalytics } from "@/components/cookie-consent/google-analytics";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { montserrat, poppins } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://www.kempro.ai"),
    title: {
      default: t("home.title"),
      template: `%s | Kempro`,
    },
    description: t("home.description"),
    openGraph: {
      siteName: "Kempro",
      locale,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${montserrat.variable} ${poppins.variable}`}>
      {/* font-poppins (not font-sans/Montserrat) is the actual document
          default — matches KR's own split (Poppins for body copy). Headings
          override back to Montserrat via the global h1-h6 rule in
          globals.css; nav, buttons, and UI-chrome labels override
          explicitly where needed (see lib/fonts.ts for the full rationale). */}
      <body className="flex min-h-screen flex-col bg-primary-50/50 font-poppins text-neutral-900 antialiased">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <CookieConsentBanner />
          <GoogleAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
