import Image from "next/image";
import { CategoryFallbackBackground } from "@/components/blog/category-fallback-backgrounds";

// Renders the real cover photo when a post has one (post.coverImage in
// lib/data/blog.ts). Most posts don't have real photography yet, so those
// fall back to a per-category geometric background (see
// components/blog/category-fallback-backgrounds.tsx) instead of a
// fabricated stock photo — applied identically everywhere this component
// is used (Featured card, "Lo más reciente" list, all-articles grid).
//
// `className` here is sizing-only (aspect-ratio/width/height) — callers
// should NOT include hover transform/transition classes in it. The photo
// branch owns its own hover zoom (scale) internally; the fallback
// branch's hover animation lives inside each pattern in
// category-fallback-backgrounds.tsx instead, since those move internal
// shapes rather than scaling the whole block (see that file's own
// comment for why).
export function CoverImage({
  categoryKey,
  src,
  alt,
  className,
  priority = false,
  squareCorners,
}: {
  categoryKey: string;
  src?: string;
  alt?: string;
  className?: string;
  /** Set for above-the-fold placements (hero, article cover) so Next.js
   * preloads it instead of lazy-loading the page's LCP element. */
  priority?: boolean;
  /** Forwarded to CategoryFallbackBackground — only affects the no-photo
   * fallback branch, since a real photo's corners are already shaped by
   * the caller's own className/overflow-hidden wrapper. */
  squareCorners?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <CategoryFallbackBackground
      categoryKey={categoryKey}
      className={className}
      squareCorners={squareCorners}
    />
  );
}
