"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { KemproLogo } from "@/components/ui/kempro-logo";
import { XIcon, YouTubeIcon } from "@/components/ui/icons";

// TODO: agregar URLs reales de redes sociales cuando las cuentas existan.
const socialLinks = [
  { name: "X", icon: XIcon },
  { name: "YouTube", icon: YouTubeIcon },
] as const;

const navItems = [
  { href: "/servicios", key: "services" },
  { href: "/casos-de-exito", key: "caseStudies" },
  { href: "/sobre-nosotros", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/contacto", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full overflow-hidden bg-neutral-50">
      <div className="mx-auto flex max-w-[1280px] flex-col px-6 pb-8 pt-10 md:px-20">
        <div className="flex flex-col items-center gap-6 pb-8 md:flex-row md:justify-between md:gap-0">
          <div className="flex items-center gap-4">
            <span className="text-[13px] font-medium text-neutral-600">
              {t("followUs")}
            </span>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ name, icon: Icon }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  aria-disabled="true"
                  onClick={(event) => event.preventDefault()}
                  className="flex h-[30px] w-[30px] cursor-not-allowed items-center justify-center rounded-full bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[13px] transition-colors hover:text-primary-600 ${
                    isActive ? "text-primary-600" : "text-neutral-700"
                  }`}
                >
                  {tNav(item.key)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-neutral-300" />

        <div className="flex flex-col items-center gap-4 pt-6 md:flex-row md:justify-between">
          <Link href="/">
            <KemproLogo
              variant="primary"
              size={40}
              textColor="#1E293B"
              letterSpacing="-0.02em"
            />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <p className="text-xs text-neutral-400">
              &copy; {year} Kempro SAS. {t("rights")}
            </p>
            <Link
              href="/aviso-de-privacidad"
              className="text-xs text-neutral-500 hover:text-primary-600"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terminos-de-servicio"
              className="text-xs text-neutral-500 hover:text-primary-600"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
