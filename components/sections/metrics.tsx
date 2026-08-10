import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/ui/fade-in";
import { AnimatedCounter } from "@/components/ui/animated-counter";

type MetricItem = { value: string; label: string };

export function Metrics() {
  const t = useTranslations("Home.metrics");
  const items = t.raw("items") as MetricItem[];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((item, index) => (
            <FadeIn
              key={item.label}
              delay={index * 80}
              direction={index % 2 === 0 ? "up" : "left"}
              className="text-center"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="text-3xl font-bold text-primary-600 sm:text-4xl">
                <AnimatedCounter value={item.value} />
              </dd>
              <p className="mt-2 text-sm text-neutral-600">{item.label}</p>
            </FadeIn>
          ))}
        </dl>
      </Container>
    </section>
  );
}
