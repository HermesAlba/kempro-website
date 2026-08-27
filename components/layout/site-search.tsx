"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getServices } from "@/lib/data/services";
import { getBlogPosts } from "@/lib/data/blog";
import { getCaseStudies } from "@/lib/data/case-studies";
import { SearchIcon, CloseIcon } from "@/components/ui/icons";
import { normalizeSearch as normalize } from "@/lib/normalize-search";

type ResultItem = {
  id: string;
  title: string;
  description: string;
} & (
  | { kind: "service"; slug: string }
  | { kind: "post"; slug: string }
  | { kind: "case"; slug: string }
);

type ResultGroup = {
  key: "services" | "caseStudies" | "blog";
  label: string;
  items: ResultItem[];
};

function SearchResultLink({
  item,
  onNavigate,
}: {
  item: ResultItem;
  onNavigate: () => void;
}) {
  const className =
    "block rounded-lg px-3 py-2.5 transition-colors hover:bg-primary-50/60 focus-visible:bg-primary-50/60 focus-visible:outline-none";
  const content = (
    <>
      <p className="text-sm font-semibold text-neutral-900">{item.title}</p>
      <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">{item.description}</p>
    </>
  );

  if (item.kind === "service") {
    return (
      <Link
        href={{ pathname: "/servicios/[slug]", params: { slug: item.slug } }}
        onClick={onNavigate}
        className={className}
      >
        {content}
      </Link>
    );
  }

  if (item.kind === "post") {
    return (
      <Link
        href={{ pathname: "/blog/[slug]", params: { slug: item.slug } }}
        onClick={onNavigate}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link
      href={{ pathname: "/casos-de-exito/[slug]", params: { slug: item.slug } }}
      onClick={onNavigate}
      className={className}
    >
      {content}
    </Link>
  );
}

// Search trigger + overlay, used by the header on both desktop and mobile
// (see components/layout/header.tsx). Content is read straight from the
// same lib/data/* sources every listing page already uses, so results never
// drift from what's actually published — no separate search index to keep
// in sync. Filtering runs entirely client-side (useMemo over the small,
// static dataset), so there's no network round-trip per keystroke.
export function SiteSearch({ triggerClassName }: { triggerClassName?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Search");
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  // The overlay below is rendered via a portal straight into document.body
  // (see the createPortal call at the bottom of this component) instead of
  // in place — rendering this modal in place would tie it to whatever
  // ancestor CSS the header happens to have (e.g. a past version used
  // backdrop-blur-md + overflow-hidden, which clips fixed-position
  // descendants down to the header's own ~54-134px strip via CSS's
  // containing-block rules instead of covering the viewport). Portals
  // sidestep that regardless of what any future ancestor's own CSS does.
  // mounted gates the portal to the client only, since document.body
  // doesn't exist during SSR.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  // Cmd/Ctrl+K toggles from anywhere, Escape closes — same conventions as
  // most site-search patterns, on top of the visible button for anyone who
  // doesn't know the shortcut exists.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const groups = useMemo<ResultGroup[]>(() => {
    const q = normalize(query.trim());
    if (!q) return [];

    const services: ResultItem[] = getServices(locale)
      .filter((service) => normalize(`${service.title} ${service.description}`).includes(q))
      .map((service) => ({
        id: `service-${service.id}`,
        kind: "service",
        slug: service.slug,
        title: service.title,
        description: service.description,
      }));

    const caseStudies: ResultItem[] = getCaseStudies(locale)
      .filter((caseStudy) =>
        normalize(`${caseStudy.client} ${caseStudy.industry} ${caseStudy.result}`).includes(q),
      )
      .map((caseStudy) => ({
        id: `case-${caseStudy.id}`,
        kind: "case",
        slug: caseStudy.slug,
        title: caseStudy.client,
        description: caseStudy.result,
      }));

    const posts: ResultItem[] = getBlogPosts(locale)
      .filter((post) => normalize(`${post.title} ${post.excerpt} ${post.category}`).includes(q))
      .map((post) => ({
        id: `post-${post.id}`,
        kind: "post",
        slug: post.slug,
        title: post.title,
        description: post.excerpt,
      }));

    return [
      { key: "services" as const, label: t("sections.services"), items: services },
      { key: "caseStudies" as const, label: t("sections.caseStudies"), items: caseStudies },
      { key: "blog" as const, label: t("sections.blog"), items: posts },
    ].filter((group) => group.items.length > 0);
  }, [query, locale, t]);

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const hasResults = groups.length > 0;

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("openSearch")}
        className={
          triggerClassName ??
          "flex items-center justify-center rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-primary-600"
        }
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  className="fixed inset-0 z-[70] flex items-start justify-center bg-neutral-900/40 px-4 pt-24 backdrop-blur-sm sm:pt-32"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={close}
                >
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={t("openSearch")}
                    className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-4">
                      <SearchIcon className="h-5 w-5 flex-shrink-0 text-neutral-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t("placeholder")}
                        className="w-full border-none bg-transparent text-[15px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={close}
                        aria-label={t("closeSearch")}
                        className="flex-shrink-0 rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto px-2 py-2">
                      {!hasQuery ? (
                        <p className="px-3 py-6 text-center text-sm text-neutral-500">{t("hint")}</p>
                      ) : !hasResults ? (
                        <p className="px-3 py-6 text-center text-sm text-neutral-500">
                          {t("noResults", { query: trimmedQuery })}
                        </p>
                      ) : (
                        groups.map((group) => (
                          <div key={group.key} className="py-2">
                            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                              {group.label}
                            </p>
                            {group.items.map((item) => (
                              <SearchResultLink key={item.id} item={item} onNavigate={close} />
                            ))}
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
