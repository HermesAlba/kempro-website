"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SiteSearch } from "@/components/layout/site-search";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { MenuIcon, CloseIcon, XIcon, YouTubeIcon } from "@/components/ui/icons";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";
import { montserrat } from "@/lib/fonts";

// TODO: agregar URLs reales de redes sociales cuando las cuentas existan
// (mismo placeholder que components/layout/footer.tsx).
const socialLinks = [
  { name: "X", icon: XIcon },
  { name: "YouTube", icon: YouTubeIcon },
] as const;

const navItems = [
  { href: "/", key: "home" },
  { href: "/servicios", key: "services" },
  { href: "/sobre-nosotros", key: "about" },
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
// is 176 (112px logo-only bar + 64px hamburger/search bar) — split into two
// stacked bars per request, matching the reference site's own two-row
// mobile header shape (was a single merged 81px bar). The logo bar was
// doubled from its initial 56px to 112px per a follow-up request, with the
// logo itself scaled up proportionally (24 → 48) to match.
export const HEADER_OFFSET = { mobile: 176, desktop: 207 } as const;

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

  // Sobre Nosotros gets its own header palette on desktop, per request:
  // the logo bar (normally black) becomes white, and the nav/menu bar
  // (normally brand indigo) becomes black — roughly a swap of the two
  // bars' colors, scoped to this one page. Mobile keeps the site-wide
  // indigo single bar unchanged (it merges the logo + hamburger into one
  // bar, so the desktop-only swap doesn't map cleanly onto it).
  const isAboutPage = pathname === "/sobre-nosotros";

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
          own primary-600/700 treatment instead, sized down to match.
          On /sobre-nosotros this bar flips to white (isAboutPage) — see
          comment above isAboutPage — so the logo/social/search/locale
          colors below also flip to their dark-on-white equivalents. */}
      <div className={`hidden lg:block ${isAboutPage ? "bg-white" : "bg-black"}`}>
        <div className="mx-auto flex h-[146px] max-w-7xl items-center justify-between px-8">
          {/* size=57: originally 71 (matching KR's own logo proportion
              within its top bar — 71/146 ≈ 48.6% of the bar's height,
              measured via getBoundingClientRect), scaled down to 80% of
              that (71 * 0.8 = 56.8 ≈ 57) per request. Left-aligned as the
              flex row's first child, so shrinking it only pulls in from
              the right; its starting x position (the bar's own px-8) is
              unchanged. markColor="#000000" (black, matching this bar's
              own bg-black) per request — the mark's rings no longer read
              as brand indigo here, only the white stroke/center dot and
              white wordmark stay visible. Scoped to this instance only;
              other "dark" variant usages (e.g. the footer) keep the
              default indigo mark. On /sobre-nosotros (white bar) this
              switches to variant="primary" instead (indigo mark, black
              wordmark — the variant meant for light backgrounds) with no
              markColor override, so it reads correctly against white. */}
          <Link href="/" className="flex-shrink-0">
            {isAboutPage ? (
              <KemproLogo variant="primary" size={57} />
            ) : (
              <KemproLogo variant="dark" size={57} markColor="#000000" />
            )}
          </Link>
          {/* Social icons — positioned right after the logo (not bundled
              with search/language/CTA on the right), matching KR's own top
              bar: logo, then its social-icon cluster, then its other
              utility blocks, spread across the row via justify-between.
              Same placeholder pattern as the footer's socialLinks
              (href="#", disabled) since real profile URLs don't exist yet. */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, icon: Icon }) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                aria-disabled="true"
                onClick={(event) => event.preventDefault()}
                className={`flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full transition-colors ${
                  isAboutPage
                    ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          {/* Montserrat here (see lib/fonts.ts) — matches the reference's
              own header typeface. CTA below matches KR's own bold-title
              size (17px) but stays font-normal (not bold), per request. */}
          <div className={`flex items-center gap-5 ${montserrat.className}`}>
            <SiteSearch
              triggerClassName={`flex items-center justify-center rounded-md p-1.5 transition-colors ${
                isAboutPage
                  ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            />
            <LocaleSwitcher dark={!isAboutPage} />
            <Link
              href="/contacto"
              className="inline-flex h-[34px] items-center justify-center gap-2 rounded-[6px] bg-primary-600 px-4 text-[17px] font-normal tracking-normal text-white transition-colors hover:bg-primary-700"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile row 1 — logo only, black, 112px tall (h-28). Own bar (not
          the desktop top info bar, which stays hidden below lg) — per
          request: "en la primera linea solo el logo de kempro", later
          doubled to 112px (was 56px/h-14) per a follow-up request. Always
          black regardless of isAboutPage — the desktop white/black palette
          swap (see isAboutPage comment above) doesn't extend to mobile,
          matching the precedent already set by the row below (mobile stays
          bg-primary-600 on /sobre-nosotros even though its desktop
          counterpart flips to black). size=48: scaled up from 24 in the
          same proportion as the bar itself (2x), so the logo still reads
          at the same relative size within the taller bar. Part of
          HEADER_OFFSET.mobile (176 = this bar's 112px + the 64px bar
          below). */}
      <div className="bg-black lg:hidden">
        <div className="mx-auto flex h-28 max-w-7xl items-center px-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex-shrink-0">
            <KemproLogo variant="dark" size={48} markColor="#000000" />
          </Link>
        </div>
      </div>

      {/* Nav bar — primary-600, full width, standing in for the reference's
          orange bar. Desktop height (61px) matches that orange bar's own
          measured height (60.5px, was 69px here). On mobile this now
          carries just the hamburger + search (the logo moved to its own
          row above) — 64px tall (h-16), the other part of
          HEADER_OFFSET.mobile alongside the 112px logo row above. On
          /sobre-nosotros this flips to black at lg only (isAboutPage) —
          mobile (below lg) keeps bg-primary-600 regardless, per request
          (see isAboutPage comment above). Link text/hover colors are
          unchanged: white/85 with a primary-700 hover reads fine against
          black too. */}
      <div className={isAboutPage ? "bg-primary-600 lg:bg-black" : "bg-primary-600"}>
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6 lg:h-[61px] lg:px-8">
          {/* Mobile: hamburger + search, at opposite ends of the bar — per
              request: "sobre fondo indigo debe quedar la hamburguesa y el
              buscador, en ambos extremos". size=24 unchanged from before
              this split. */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <button
              type="button"
              className="flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-expanded={open}
              aria-label={open ? t("closeMenu") : t("openMenu")}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            <SiteSearch triggerClassName="flex items-center justify-center rounded-md p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white" />
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
        // montserrat.className: matches the desktop nav's font (see the
        // comment above it) — body's document default is now Poppins, and
        // this mobile drawer isn't nested inside that other Montserrat
        // wrapper, so it needs its own explicit override.
        <div className={`border-t border-primary-700 bg-primary-600 lg:hidden ${montserrat.className}`}>
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
