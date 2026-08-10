import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/servicios": {
      es: "/servicios",
      en: "/services",
    },
    "/casos-de-exito": {
      es: "/casos-de-exito",
      en: "/case-studies",
    },
    "/sobre-nosotros": {
      es: "/sobre-nosotros",
      en: "/about",
    },
    "/blog": {
      es: "/blog",
      en: "/blog",
    },
    "/blog/[slug]": {
      es: "/blog/[slug]",
      en: "/blog/[slug]",
    },
    "/contacto": {
      es: "/contacto",
      en: "/contact",
    },
    "/aviso-de-privacidad": {
      es: "/aviso-de-privacidad",
      en: "/privacy-notice",
    },
    "/terminos-de-servicio": {
      es: "/terminos-de-servicio",
      en: "/terms-of-service",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
