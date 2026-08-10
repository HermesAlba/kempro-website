import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRightIcon } from "@/components/ui/icons";

export function CtaBand({
  title,
  subtitle,
  cta,
}: {
  title: string;
  subtitle: string;
  cta: string;
}) {
  return (
    <section className="bg-dark-900 py-20 sm:py-24">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-neutral-300">{subtitle}</p>
          <div className="mt-8">
            <ButtonLink href="/contacto" variant="primary">
              {cta}
              <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
            </ButtonLink>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
