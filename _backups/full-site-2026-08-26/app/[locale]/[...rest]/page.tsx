import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

// Catches any path under a valid locale that doesn't match a defined route
// (e.g. /es/pagina-que-no-existe). Without this, an unmatched path never
// enters the [locale] layout tree at all, so Next.js renders the root
// app/not-found.tsx instead of the localized, styled app/[locale]/not-found.tsx.
// Calling notFound() here — after the locale is resolved — is what makes the
// nested one render.
export default async function CatchAll({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  notFound();
}
