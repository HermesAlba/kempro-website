"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SiteSearch } from "@/components/layout/site-search";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";
import { montserrat } from "@/lib/fonts";

const navItems = [
  { href: "/", key: "home" },
  { href: "/SN", key: "about" },
  { href: "/servicios", key: "services" },
  { href: "/casos-de-exito", key: "caseStudies" },
  { href: "/blog", key: "blog" },
  { href: "/contacto", key: "contact" },
] as const;

// Every page's own first section now bleeds all the way up to the very top
// of the screen (including the space to the left and right of the floating
// nav card), pulling up underneath the nav by HEADER_OFFSET and padding
// back down by the same amount so its content position is unaffected — see
// e.g. components/sections/hero.tsx and components/sections/page-hero.tsx.
// Keep HEADER_OFFSET in sync with the nav's own rendered height below.
// Desktop is 207 (146px top info bar + 61px nav bar) — both measured
// directly off the reference site's own two bars via getComputedStyle/
// getBoundingClientRect (146.1px and 60.5px respectively) so Kempro's
// header matches its exact proportions, not just its colors/layout. Mobile
// is untouched at 81 (its one merged bar) since the reference's own mobile
// header collapses differently and wasn't part of what was measured.
export const HEADER_OFFSET = { mobile: 81, desktop: 207 } as const;

// Two-tier layout (reference: a construction-industry site's header — dark
// info bar on top, full-width accent nav bar below with the current section
// highlighted) reskinned with Kempro's own palette and, per request, ONLY
// the content already in the site's nav — no invented sections like "Job
// Opportunities" or office locations. Replaces the previous single floating
// rounded card. Both bars are full-width and edge-to-edge (no side insets,
// no rounding, no blur) — a deliberate contrast from the old card treatment.
export function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50">
      {/* Top info bar — desktop only. True black (#000000) — matches the
          reference site's own header bar exactly (confirmed via its
          computed background-color: rgb(0, 0, 0)); went through
          bg-primary-900 then bg-neutral-900 before landing back here per
          successive requests. Height is 146px, matching that same
          reference bar's own measured height (was 88px) — logo/wordmark
          size unchanged, so it now sits with even more vertical breathing
          room. Logo + the utilities that used to sit at the right of the
          old single-bar header (search, language, CTA) — nothing new
          added. The CTA button below deliberately does NOT reuse the
          shared ctaButtonClasses constant (bg-neutral-900, a near-black
          that would nearly disappear against true black) — it gets its
          own primary-600/700 treatment instead, sized down to match. */}
      <div className="hidden bg-black lg:block">
        <div className="mx-auto flex h-[146px] max-w-7xl items-center justify-between px-8">
          {/* size=71 matches KR's own logo proportion within its top bar:
              their logo image renders at 71px tall inside a 146px-tall bar
              (71/146 ≈ 48.6%) — measured via getBoundingClientRect. Kempro's
              own top bar is already the same 146px height (see the bar's
              own h-[146px] below), so using the same 71px mark size lands
              on the same proportion. Left-aligned as the flex row's first
              child, so growing it only extends to the right; its starting x
              position (the bar's own px-8) is unchanged. */}
          <Link href="/" className="flex-shrink-0">
            <KemproLogo variant="dark" size={71} />
          </Link>
          {/* Montserrat here (see lib/fonts.ts) — matches the reference's
              own header typeface. CTA below matches KR's own bold-title
              size (17px) but stays font-normal (not bold), per request. */}
          <div className={`flex items-center gap-5 ${montserrat.className}`}>
            <SiteSearch triggerClassName="flex items-center justify-center rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white" />
            <LocaleSwitcher dark />
            <Link
              href="/contacto"
              className="inline-flex h-[34px] items-center justify-center gap-2 rounded-[6px] bg-primary-600 px-4 text-[17px] font-normal tracking-normal text-white transition-colors hover:bg-primary-700"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>

      {/* Nav bar — primary-600, full width, standing in for the reference's
          orange bar. Desktop height (61px) matches that orange bar's own
          measured height (60.5px, was 69px here). On mobile this is the
          ONLY bar (top info bar is hidden), so it carries the logo +
          hamburger there instead of the desktop nav row — its own height
          (81px) is unrelated to the reference measurement above (see
          HEADER_OFFSET). */}
      <div className="bg-primary-600">
        <div className="mx-auto flex h-[81px] max-w-7xl items-center px-6 lg:h-[61px] lg:px-8">
          {/* Mobile: logo + search + hamburger */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <Link href="/" onClick={() => setOpen(false)} className="flex-shrink-0">
              <KemproLogo variant="dark" size={30} />
            </Link>
            <div className="flex items-center gap-1">
              <SiteSearch triggerClassName="flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white" />
              <button
                type="button"
                className="flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-expanded={open}
                aria-label={open ? t("closeMenu") : t("openMenu")}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Desktop: full-width nav row, each item its own full-height tab
              so the active one can get a solid background block (the
              reference's highlighted current-section tab) instead of just
              an underline/color change. flex-1 + justify-center centers the
              whole group within the bar (nav is the only child visible at
              lg, so it's free to claim the full row width). Lowercase, no
              tracking — per request (was uppercase/tracking-wide). Font
              matches the reference's own nav links exactly: Montserrat
              (see lib/fonts.ts), 15px, weight 600. */}
          <nav
            className={`hidden h-full flex-1 items-stretch justify-center lg:flex ${montserrat.className}`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-5 text-[15px] font-semibold transition-colors ${
                    isActive ? "bg-primary-800 text-white" : "text-white/85 hover:bg-primary-700"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {open ? (
        <div className="border-t border-primary-700 bg-primary-600 lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive ? "bg-primary-800 text-white" : "text-white/85 hover:bg-primary-700"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              );
            })}
            <div className="mt-2 flex items-center justify-between px-3">
              <LocaleSwitcher dark />
            </div>
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className={`${ctaButtonClasses} mt-3 w-full px-[20px] py-[10px]`}
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
