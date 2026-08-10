import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/lib/data/blog";
import { CoverImage } from "@/components/blog/cover-image";
import { paletteFor } from "@/lib/blog-categories";

export function CarouselCard({ post }: { post: BlogPost }) {
  const { textColor } = paletteFor(post.categoryKey);
  const href = { pathname: "/blog/[slug]", params: { slug: post.slug } } as const;

  return (
    <article className="flex h-[280px] w-[330px] flex-shrink-0 flex-col bg-[#F9F7F4]">
      <Link href={href} className="block">
        <CoverImage
          categoryKey={post.categoryKey}
          src={post.coverImage}
          alt={post.title}
          className="h-[140px] w-full"
        />
      </Link>

      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        <p
          className="text-[12px] font-semibold uppercase tracking-wide"
          style={{ color: textColor }}
        >
          {post.category}
        </p>
        <h3 className="text-[20px] font-bold leading-snug text-neutral-900">
          <Link href={href} className="hover:text-primary-600">
            {post.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
