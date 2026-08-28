import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/ui/fade-in";
import type { CustomerStory } from "@/lib/data/customer-stories";

function FeaturedCard({
  story,
  ctaLabel,
  index,
}: {
  story: CustomerStory;
  ctaLabel: string;
  index: number;
}) {
  const href = { pathname: "/HC/[slug]", params: { slug: story.slug } } as const;

  return (
    <FadeIn delay={index * 100} className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-shadow duration-200 ease-out hover:shadow-lg focus-visible:shadow-lg sm:flex-row"
        style={{ backgroundColor: "var(--color-hc-blue-dark)" }}
      >
        <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden bg-black/20 sm:aspect-auto sm:w-1/2">
          {story.coverImageUrl ? (
            <Image
              src={story.coverImageUrl}
              alt={story.title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 p-8">
          {story.category.label ? (
            <p
              className="font-sans text-[11px] font-semibold uppercase tracking-wide"
              style={{ color: "var(--color-hc-blue)" }}
            >
              {story.category.label}
            </p>
          ) : null}
          <h3 className="text-[22px] font-bold leading-snug text-white">{story.title}</h3>
          <p className="line-clamp-3 text-[14px] leading-relaxed text-white/70">
            {story.summary}
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors group-hover:text-[var(--color-hc-blue)]">
            {ctaLabel}
            <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}

export function HcFeaturedStories({
  stories,
  title,
  ctaLabel,
  emptyLabel,
}: {
  stories: CustomerStory[];
  title: string;
  ctaLabel: string;
  emptyLabel: string;
}) {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <FadeIn>
          <h2 className="text-[20px] font-bold text-neutral-900">{title}</h2>
        </FadeIn>
        {stories.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {stories.slice(0, 2).map((story, index) => (
              <FeaturedCard key={story.id} story={story} ctaLabel={ctaLabel} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-[14px] text-neutral-500">{emptyLabel}</p>
        )}
      </div>
    </section>
  );
}
