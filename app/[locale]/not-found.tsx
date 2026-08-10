import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-neutral-600">{t("description")}</p>
        <div className="mt-8">
          <ButtonLink href="/">{t("cta")}</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
