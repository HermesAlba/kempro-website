import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/data/blog";
import { CoverImage } from "@/components/blog/cover-image";
import { paletteFor } from "@/lib/blog-categories";

export function FeaturedStrip({ post }: { post: BlogPost }) {
  const { textColor } = paletteFor(post.categoryKey);
  const href = { pathname: "/blog/[slug]", params: { slug: post.slug } } as const;

  return (
    <div className="flex min-h-[280px] flex-col gap-6 md:flex-row">
      <Link href={href} className="block flex-shrink-0 md:w-[560px]">
        <CoverImage
          categoryKey={post.categoryKey}
          src={post.coverImage}
          alt={post.title}
          className="h-56 w-full sm:h-64 md:h-full"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-center gap-4 py-2 md:py-6">
        <p
          className="text-[12px] font-semibold uppercase tracking-wide"
          style={{ color: textColor }}
        >
          {post.category}
        </p>
        <h2 className="text-[26px] font-bold leading-tight text-neutral-900 sm:text-[34px]">
          <Link href={href} className="hover:text-primary-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-[13px] leading-relaxed text-neutral-600">{post.excerpt}</p>
      </div>
    </div>
  );
}
