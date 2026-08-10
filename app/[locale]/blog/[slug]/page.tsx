import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getBlogPost, getBlogPosts, type BlogBlock } from "@/lib/data/blog";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";

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
    },
  };
}

function BlogBlockRenderer({ block }: { block: BlogBlock }) {
  if (block.type === "heading") {
    return (
      <h2 className="mt-10 text-2xl font-semibold text-neutral-900">
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-neutral-700">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className="mt-4 leading-relaxed text-neutral-700">{block.text}</p>;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const post = getBlogPost(locale as Locale, slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <FadeIn>
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            &larr; {t("backToBlog")}
          </Link>

          <div className="mt-6 flex items-center gap-3 text-xs font-medium text-neutral-500">
            <span className="rounded-full bg-primary-50 px-2.5 py-1 text-primary-600">
              {post.category}
            </span>
            <span>{formattedDate}</span>
            <span>&middot;</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            {t("by")} {post.author}
          </p>

          <div className="mt-8 h-56 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500" />

          <div className="mt-10">
            {post.content.map((block, index) => (
              <BlogBlockRenderer key={index} block={block} />
            ))}
          </div>
        </FadeIn>
      </Container>
    </article>
  );
}
