"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SiteSearch } from "@/components/layout/site-search";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { ctaButtonClasses } from "@/components/ui/cta-button-classes";

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
// Keep HEADER_OFFSET in sync with the nav's own rendered height below (card
// height, incl. its border).
export const HEADER_OFFSET = { mobile: 54, desktop: 70 } as const;

export function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // bg-white/80 + border/shadow is uniform across every page, including
  // the contact page (previously had its own borderless/shadowless
  // treatment so its background gradient showed through the edges) and
  // blog article pages (previously used a fully solid card for contrast
  // against their own busy category-fallback background).

  return (
    // The nav no longer spans edge-to-edge: it's a white, rectangular card
    // inset from the viewport on the sides, flush with the very top of the
    // screen — matching the Blog 8.png reference (sharp, rectangular
    // corners, not rounded). Every page's own background bleeds up behind
    // it (see HEADER_OFFSET above), so the header itself carries no
    // background of its own.
    <header className="sticky top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-10 lg:px-16">
        <div className="overflow-hidden rounded-b-lg border-x border-b border-neutral-200/70 bg-white/80 shadow-sm backdrop-blur-md">
          <div className="flex h-[53px] items-center justify-between gap-6 px-6 lg:h-[69px] lg:px-8">
            <Link href="/" onClick={() => setOpen(false)} className="flex-shrink-0">
              <KemproLogo variant="primary" size={36} />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                      isActive ? "text-primary-600" : "text-neutral-600"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-4 lg:flex">
              <SiteSearch />
              <LocaleSwitcher />
              <Link
                href="/contacto"
                className={`${ctaButtonClasses} h-[35px] w-[140px] px-[20px] py-[10px]`}
              >
                {t("cta")}
              </Link>
            </div>

            {/* Mobile: search trigger stays visible next to the hamburger
                (rather than tucked inside the slide-down panel) so it's
                reachable in one tap regardless of menu state — SiteSearch's
                own overlay already covers the full viewport, so it doesn't
                need the menu open first. */}
            <div className="flex items-center gap-1 lg:hidden">
              <SiteSearch />
              <button
                type="button"
                className="flex items-center justify-center rounded-md p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-600"
                aria-expanded={open}
                aria-label={open ? t("closeMenu") : t("openMenu")}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {open ? (
            <div className="border-t border-neutral-200 bg-white lg:hidden">
              <div className="flex flex-col gap-1 px-6 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600"
                    onClick={() => setOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <div className="mt-2 flex items-center justify-between px-3">
                  <LocaleSwitcher />
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
        </div>
      </div>
    </header>
  );
}
