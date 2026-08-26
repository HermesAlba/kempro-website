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
    "/servicios/[slug]": {
      es: "/servicios/[slug]",
      en: "/services/[slug]",
    },
    "/casos-de-exito": {
      es: "/historias-de-clientes",
      en: "/customer-stories",
    },
    "/casos-de-exito/[slug]": {
      es: "/historias-de-clientes/[slug]",
      en: "/customer-stories/[slug]",
    },
    "/HC": {
      es: "/HC",
      en: "/HS",
    },
    "/HC/[slug]": {
      es: "/HC/[slug]",
      en: "/HS/[slug]",
    },
    "/SN": {
      es: "/sobre-nosotros",
      en: "/SN",
    },
    "/sobre-nosotros": {
      es: "/sobre-nosotros1",
      en: "/about",
    },
    "/blog": {
      es: "/blog",
      en: "/blog",
    },
    "/BL": {
      es: "/BL",
      en: "/BL",
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
