import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="border-b border-neutral-200 bg-neutral-50 py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </FadeIn>
      </Container>
    </section>
  );
}
