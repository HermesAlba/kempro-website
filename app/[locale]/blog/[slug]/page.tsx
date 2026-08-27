import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/data/blog";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CategoryFallbackBackground } from "@/components/blog/category-fallback-backgrounds";
import { BlockRenderer } from "@/components/blog/block-renderer";
import { XIcon, YouTubeIcon } from "@/components/ui/icons";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

const SITE_URL = "https://www.kempro.ai";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale as Locale, slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const tNav = await getTranslations("Nav");
  const post = getBlogPost(locale as Locale, slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const shareUrl = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const shareHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;

  // Pairs the inline CTA banner with the paragraph nearest the article's
  // midpoint, so it works for any post length/structure, not just this one.
  const ctaIndex = post.content.findIndex(
    (block, index) => index >= Math.floor(post.content.length / 2) && block.type === "paragraph",
  );

  return (
    <article className="bg-white">
      {/* Bleeds up behind the floating nav (see HEADER_OFFSET in
          components/layout/header.tsx) so this background shows through
          the nav's side margins instead of the generic header strip; the
          matching top padding keeps the title position unchanged.
          Background is the same per-category fallback pattern used by the
          blog thumbnails (see components/blog/category-fallback-backgrounds.tsx),
          for visual consistency between an article's own header and how
          it's represented everywhere else on the blog — always the
          decorative pattern here regardless of whether the post has a
          real coverImage (that's reserved for the thumbnails). Breadcrumbs
          live below, in the white block with the indigo divider, not
          overlaid on this image — see the FadeIn right after this
          section closes. */}
      <section className="relative -mt-[81px] flex flex-col justify-center overflow-hidden rounded-xl pt-[81px] lg:-mt-[207px] lg:min-h-[328px] lg:pt-[207px]">
        <CategoryFallbackBackground
          categoryKey={post.categoryKey}
          className="absolute inset-0 h-full w-full"
          squareCorners
        />

        <FadeIn className="relative px-6 pb-10 pt-8 sm:px-10 lg:px-20">
          <div className="mx-auto flex max-w-[750px] flex-col items-center gap-6 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.02em] text-primary-600">
              {post.category}
            </p>
            <p className="text-sm font-medium text-neutral-800">
              {formattedDate} &middot; {post.readingTime}
            </p>
            <h1 className="line-clamp-2 text-[32px] font-bold leading-tight tracking-[-0.02em] text-neutral-900 sm:text-[40px]">
              {post.title}
            </h1>
          </div>
        </FadeIn>
      </section>

      <FadeIn className="px-6 pb-10 pt-8 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[750px] flex-col items-center gap-6 text-center">
          <div className="h-1 w-16 rounded-full bg-primary-600" aria-hidden="true" />
          <div className="w-full text-left">
            <Breadcrumbs
              items={[
                { label: tNav("home"), href: "/" },
                { label: tNav("blog"), href: "/blog" },
              ]}
              linkClassName="text-neutral-700 hover:text-primary-600 hover:underline"
            />
          </div>
          <div className="flex items-center gap-3">
            <a
              href={shareHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300"
            >
              <XIcon className="h-4 w-4" />
            </a>
            {/* TODO: agregar URL real del canal de YouTube cuando exista. */}
            <span
              aria-label="YouTube"
              className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full bg-neutral-200 text-neutral-600"
            >
              <YouTubeIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={100} className="px-6 pb-20 pt-12 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[750px] flex-col gap-8">
          {post.content.map((block, index) => {
            if (index === ctaIndex && block.type === "paragraph") {
              return (
                <div key={index} className="flex flex-col gap-6 md:flex-row md:items-start">
                  <p className="flex-1 text-[16px] leading-[1.6] text-neutral-700">
                    {block.text}
                  </p>
                  <div className="flex w-full flex-shrink-0 flex-col items-center justify-center gap-4 rounded-xl bg-[#E0DDFF] p-6 text-center md:w-[280px]">
                    <p className="text-[20px] font-bold text-neutral-800">
                      {t("ctaBannerTitle")}
                    </p>
                    <Link
                      href="/contacto"
                      className={`${ctaButtonClasses} h-[35px] w-[140px] px-[20px] py-[10px]`}
                    >
                      {t("ctaBannerCta")}
                    </Link>
                  </div>
                </div>
              );
            }

            return <BlockRenderer key={index} block={block} />;
          })}
        </div>
      </FadeIn>
    </article>
  );
}
