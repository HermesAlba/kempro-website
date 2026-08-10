import Image from "next/image";
import { paletteFor } from "@/lib/blog-categories";

// Renders the real cover photo when a post has one (post.coverImage in
// lib/data/blog.ts). Most posts don't have real photography yet, so those
// fall back to a branded gradient keyed by category — matching the
// placeholder convention already used elsewhere on the site, instead of a
// fabricated stock photo.
export function CoverImage({
  categoryKey,
  src,
  alt,
  className,
}: {
  categoryKey: string;
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 760px, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const { imageFrom, imageTo } = paletteFor(categoryKey);

  return (
    <div
      role="img"
      aria-hidden="true"
      className={className}
      style={{ backgroundImage: `linear-gradient(135deg, ${imageFrom}, ${imageTo})` }}
    />
  );
}
