import Image from "next/image";
import { PlayIcon } from "@/components/ui/icons";
import { FadeIn } from "@/components/ui/fade-in";
import type { CustomerStory } from "@/lib/data/customer-stories";

export function HcVideoGrid({
  stories,
  title,
  emptyLabel,
}: {
  stories: CustomerStory[];
  title: string;
  emptyLabel: string;
}) {
  return (
    <section className="border-t border-neutral-200 bg-white px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <FadeIn>
          <h2 className="text-[20px] font-bold text-neutral-900">{title}</h2>
        </FadeIn>
        {stories.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, index) => (
              <FadeIn key={story.id} delay={index * 100}>
                <a
                  href={story.videoUrl ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-900"
                >
                  {story.coverImageUrl ? (
                    <Image
                      src={story.coverImageUrl}
                      alt={story.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover opacity-80 transition-opacity group-hover:opacity-60"
                    />
                  ) : null}
                  <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md transition-transform group-hover:scale-105">
                    <PlayIcon className="h-6 w-6 translate-x-0.5" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-[14px] font-semibold text-white">
                    {story.title}
                  </span>
                </a>
              </FadeIn>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-[14px] text-neutral-500">{emptyLabel}</p>
        )}
      </div>
    </section>
  );
}
