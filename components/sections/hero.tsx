import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section className="relative overflow-hidden bg-dark-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      </div>

      <Container className="py-24 sm:py-32 lg:py-36">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-300">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg text-neutral-300 sm:text-xl">
            {t("subtitle")}
          </p>
          <p className="mt-12 text-sm text-neutral-400">{t("trustLabel")}</p>
        </FadeIn>
      </Container>
    </section>
  );
}
