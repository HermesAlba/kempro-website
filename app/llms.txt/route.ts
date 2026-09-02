import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { getServices } from "@/lib/data/services";
import { getCaseStudies } from "@/lib/data/case-studies";
import { getBlogPosts } from "@/lib/data/blog";

// llms.txt (see llmstxt.org) — a plain-text, markdown-formatted map of the
// site meant for AI answer engines (ChatGPT, Perplexity, Claude, Google AI
// Overviews) to fetch directly instead of scraping/rendering the full HTML
// site. This is the GEO counterpart to sitemap.xml: sitemap.xml is for
// search-engine crawlers deciding what to index, llms.txt is for
// LLM-backed tools deciding what to cite. Generated as a route handler
// (same pattern as app/robots.ts and app/sitemap.ts) rather than a static
// public/ file so it always reflects the live services/case studies/blog
// posts instead of drifting out of sync as content changes.
//
// Content is in English regardless of the site's default locale (es) —
// that's the de facto convention for llms.txt across the sites that
// publish one, since it's consumed by AI tooling rather than end users.
// Each entry links to the Spanish URL (the site's default locale) with the
// English version reachable one click away via the locale switcher, same
// as everywhere else on the site.

const baseUrl = "https://www.kempro.ai";
const locale = routing.defaultLocale;

function absoluteUrl(pathname: "/sobre-nosotros" | "/contacto"): string {
  return `${baseUrl}${getPathname({ locale, href: pathname })}`;
}

function serviceUrl(slug: string): string {
  return `${baseUrl}${getPathname({
    locale,
    href: { pathname: "/servicios/[slug]", params: { slug } },
  })}`;
}

function caseStudyUrl(slug: string): string {
  return `${baseUrl}${getPathname({
    locale,
    href: { pathname: "/casos-de-exito/[slug]", params: { slug } },
  })}`;
}

function blogUrl(slug: string): string {
  return `${baseUrl}${getPathname({
    locale,
    href: { pathname: "/blog/[slug]", params: { slug } },
  })}`;
}

export async function GET() {
  const services = getServices(locale);
  const caseStudies = getCaseStudies(locale);
  const posts = getBlogPosts(locale);

  const lines: string[] = [];

  lines.push("# Kempro");
  lines.push("");
  lines.push(
    "> Kempro is an AI strategy, automation and digital-presence consultancy based in " +
      "Medellín, Colombia, serving Spanish- and English-speaking organizations across " +
      "Latin America and beyond. Kempro helps companies move from isolated AI pilots to " +
      "real strategy and deployed automation: AI strategy roadmaps, custom AI agents and " +
      "process automation, LLM integration, Microsoft Copilot / SharePoint intranets, and " +
      "full-stack web and digital-presence work.",
  );
  lines.push("");

  lines.push("## Company");
  lines.push("");
  lines.push(`- [About Kempro](${absoluteUrl("/sobre-nosotros")}): Who Kempro is and how the team works.`);
  lines.push(`- [Contact](${absoluteUrl("/contacto")}): Get in touch with the Kempro team.`);
  lines.push("");

  lines.push("## Services");
  lines.push("");
  for (const service of services) {
    lines.push(`- [${service.title}](${serviceUrl(service.slug)}): ${service.description}`);
  }
  lines.push("");

  lines.push("## Case studies");
  lines.push("");
  for (const caseStudy of caseStudies) {
    lines.push(`- [${caseStudy.client}](${caseStudyUrl(caseStudy.slug)}): ${caseStudy.result}`);
  }
  lines.push("");

  lines.push("## Blog");
  lines.push("");
  for (const post of posts) {
    lines.push(`- [${post.title}](${blogUrl(post.slug)}): ${post.excerpt}`);
  }
  lines.push("");

  lines.push("## Optional");
  lines.push("");
  lines.push(`- [XML sitemap](${baseUrl}/sitemap.xml): Full list of indexable URLs, ES/EN.`);

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
