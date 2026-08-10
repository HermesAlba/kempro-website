import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/data/blog";
import { CoverImage } from "@/components/blog/cover-image";
import { paletteFor } from "@/lib/blog-categories";

export function HeroArticle({ post }: { post: BlogPost }) {
  const locale = useLocale();
  const { textColor } = paletteFor(post.categoryKey);
  const href = { pathname: "/blog/[slug]", params: { slug: post.slug } } as const;
  const date = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="flex min-h-[600px] flex-col bg-[#F0EEFF] md:flex-row">
      <div className="flex flex-1 flex-col justify-between gap-2 px-6 py-12 sm:px-10 sm:py-14 lg:px-20 lg:py-[60px]">
        <div className="flex flex-col gap-2">
          <p
            className="text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: textColor }}
          >
            {post.category}
          </p>
          <time dateTime={post.date} className="text-[13px] text-neutral-500">
            {date}
          </time>
          <h1 className="mt-1 text-[28px] font-bold leading-tight tracking-[-0.02em] text-neutral-900 sm:text-[38px]">
            <Link href={href} className="hover:text-primary-600">
              {post.title}
            </Link>
          </h1>
          <p className="mt-1 text-[13px] leading-relaxed text-neutral-600">{post.excerpt}</p>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600"
          >
            {post.authorInitials}
          </span>
          <div>
            <p className="text-[13px] text-neutral-900">{post.author}</p>
            <p className="text-[11px] text-neutral-400">{post.readingTime}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden py-0 md:py-[60px] md:pr-0">
        <Link href={href} className="block h-full">
          <CoverImage
            categoryKey={post.categoryKey}
            src={post.coverImage}
            alt={post.title}
            className="h-64 w-full sm:h-80 md:h-full"
          />
        </Link>
      </div>
    </section>
  );
}
