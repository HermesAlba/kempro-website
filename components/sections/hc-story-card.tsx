import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { CustomerStory } from "@/lib/data/customer-stories";

export function HcStoryCard({
  story,
  readNowLabel,
}: {
  story: CustomerStory;
  readNowLabel: string;
}) {
  const href = { pathname: "/HC/[slug]", params: { slug: story.slug } } as const;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-200 ease-out hover:shadow-lg focus-visible:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1"
      style={{ backgroundColor: "var(--color-hc-blue-dark)" }}
    >
      <div className="relative aspect-[16/10] w-full flex-shrink-0 overflow-hidden bg-black/20">
        {story.coverImageUrl ? (
          <Image
            src={story.coverImageUrl}
            alt={story.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        {story.category.label ? (
          <p
            className="font-sans text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: "var(--color-hc-blue)" }}
          >
            {story.category.label}
          </p>
        ) : null}
        <h3 className="line-clamp-2 text-[18px] font-bold leading-snug text-white transition-colors">
          {story.title}
        </h3>
        <p className="line-clamp-2 text-[14px] leading-relaxed text-white/70">{story.summary}</p>
        <span
          className="mt-auto inline-flex items-center gap-2 pt-2 text-[13px] font-semibold text-white transition-colors group-hover:text-[var(--color-hc-blue)]"
        >
          {readNowLabel}
          <ArrowRightIcon className="h-4 w-4 flex-shrink-0" />
        </span>
      </div>
    </Link>
  );
}
