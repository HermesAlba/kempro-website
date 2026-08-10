"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "@/components/ui/icons";

const ctaButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-[6px] bg-primary-600 text-[13px] tracking-[-0.02em] text-white transition-[filter] hover:brightness-90";

const navItems = [
  { href: "/", key: "home" },
  { href: "/servicios", key: "services" },
  { href: "/casos-de-exito", key: "caseStudies" },
  { href: "/sobre-nosotros", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contacto", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <div className="flex items-center gap-10">
          <Link href="/" onClick={() => setOpen(false)}>
            <KemproLogo variant="primary" size={40} />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
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
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Link
            href="/contacto"
            className={`${ctaButtonClasses} h-[35px] w-[140px] px-[20px] py-[10px]`}
          >
            {t("cta")}
            <ArrowRightIcon className="h-[14px] w-[14px] flex-shrink-0" />
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary-600 lg:hidden"
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
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
              <ArrowRightIcon className="h-[14px] w-[14px] flex-shrink-0" />
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
