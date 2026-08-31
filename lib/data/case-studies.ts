import { routing, type Locale } from "@/i18n/routing";
import type { ContentBlock } from "@/components/blog/block-renderer";

export type IndustryKey =
  | "salud"
  | "restaurantes"
  | "arquitectura"
  | "construccion"
  | "cajas-compensacion"
  | "tecnologia"
  | "retail";

export type CaseStudy = {
  id: string;
  slug: string;
  client: string;
  industry: string;
  industryKey: IndustryKey;
  date: string;
  problem: string;
  solution: string;
  result: string;
  metrics: { value: string; label: string }[];
  /** Same photo used for both the listing thumbnail (CaseCard) and the
   * detail page's hero image — a single source of truth per industry, so
   * the two views can never show different photos for the same story.
   * Optional — case studies without a real client photo (e.g. Kempro's own
   * internal stories) fall back to IndustryHeaderBackground wherever this
   * is rendered, same pattern as blog posts without a coverImage. */
  image?: string;
  /** Detail-page body content — Overview / Challenge / Solution / Business
   * Impact / Kempro Advantage, in the same block shape (and rendered by
   * the same BlockRenderer) as blog post content — see
   * components/blog/block-renderer.tsx. Built from this case study's own
   * problem/solution/result/metrics fields rather than hand-authored, so
   * every story gets real, non-generic prose without duplicating facts
   * already captured above. */
  content: ContentBlock[];
};

// One real photo per industry — reused across every case study in that
// industry rather than requiring a unique photo per story. Partial —
// "retail" has no real client photo yet (added for the WhatsApp wine-store
// bot case study; no stock photo was sourced for it), so it's intentionally
// left out; getCaseStudies leaves `image` undefined for it, and every place
// that renders a case study photo already falls back to
// IndustryHeaderBackground (its own ShoppingBagIcon) when it's missing.
const INDUSTRY_IMAGE: Partial<Record<IndustryKey, string>> = {
  salud: "/images/case-studies/salud.jpg",
  restaurantes: "/images/case-studies/restaurantes.jpg",
  arquitectura: "/images/case-studies/arquitectura.jpg",
  construccion: "/images/case-studies/construccion.jpg",
  "cajas-compensacion": "/images/case-studies/cajas-compensacion.jpg",
  tecnologia: "/images/case-studies/tecnologia.jpg",
};

// Builds the detail page's 4-section body (Overview / Solution / Business
// Impact / Kempro Advantage) from a case study's own resolved fields,
// instead of hand-authoring ~14 paragraphs per story per locale.
//
// Previously this had a 5th "El reto"/"The Challenge" section filled with
// fixed boilerplate (a canned "cuello de botella"/"bottleneck" line, a
// generic "dependía de procesos manuales..." paragraph, and a fixed
// 3-item bullet list) repeated verbatim, word for word, across every case
// study on the site — and factually mismatched for stories that aren't
// "an AI agent handling first-level tickets" (e.g. a travel-cost
// methodology, or a SharePoint/Copilot documentation project). Same
// problem in the old "La solución" section's own fixed intro/outro
// sentences and its own fixed 3-item capabilities list. Removed — every
// sentence below now comes directly from this case's own problem/
// solution/result/metrics fields, with only a single short (and clearly
// generic/brand-voice, not fake-specific) connective sentence per
// section, so nothing invents details that may not be true for a given
// story, and nothing repeats identically story to story.
function buildContent(
  locale: Locale,
  fields: {
    client: string;
    industry: string;
    problem: string;
    solution: string;
    result: string;
    metrics: { value: string; label: string }[];
    /** True only for Kempro's own internal case studies ("we used our own
     * process on ourselves") — swaps the couple of sentences that would
     * otherwise read as "Kempro partnered with Kempro" when the client and
     * the vendor are the same company. */
    isInternal?: boolean;
  },
): ContentBlock[] {
  const { client, problem, solution, result, metrics, isInternal } = fields;

  if (locale === "en") {
    return [
      { type: "heading", text: "Overview" },
      {
        type: "paragraph",
        text: isInternal
          ? `Kempro applied its own approach to a real internal challenge: designing and launching its own bilingual website using the same process it offers clients.`
          : `${client} partnered with Kempro to work through a specific challenge in its operation.`,
      },
      { type: "paragraph", text: problem },

      { type: "heading", text: "The Solution" },
      { type: "paragraph", text: solution },

      { type: "heading", text: "Business Impact" },
      { type: "paragraph", text: result },
      {
        type: "list",
        items: metrics.map((metric) => `${metric.value} — ${metric.label}`),
      },

      { type: "heading", text: "Kempro Advantage" },
      {
        type: "paragraph",
        text: "Kempro starts from a real diagnostic of each company's specific conditions rather than a one-size-fits-all formula, and stays involved through adoption — not just the initial rollout.",
      },
    ];
  }

  return [
    { type: "heading", text: "Resumen" },
    {
      type: "paragraph",
      text: isInternal
        ? `Kempro aplicó su propio método a un reto interno real: diseñar y lanzar su propio sitio web bilingüe usando el mismo proceso que ofrece a sus clientes.`
        : `${client} se asoció con Kempro para resolver un reto específico de su operación.`,
    },
    { type: "paragraph", text: problem },

    { type: "heading", text: "La solución" },
    { type: "paragraph", text: solution },

    { type: "heading", text: "Impacto en el negocio" },
    { type: "paragraph", text: result },
    {
      type: "list",
      items: metrics.map((metric) => `${metric.value} — ${metric.label}`),
    },

    { type: "heading", text: "Ventaja Kempro" },
    {
      type: "paragraph",
      text: "El método de Kempro parte de un diagnóstico real de las condiciones específicas de cada empresa, no de una fórmula genérica, y se mantiene involucrado durante la adopción — no solo en la puesta en marcha inicial.",
    },
  ];
}

const data: {
  id: string;
  slug: Record<Locale, string>;
  client: Record<Locale, string>;
  industry: Record<Locale, string>;
  industryKey: IndustryKey;
  date: string;
  problem: Record<Locale, string>;
  solution: Record<Locale, string>;
  result: Record<Locale, string>;
  metrics: Record<Locale, { value: string; label: string }[]>;
  isInternal?: boolean;
}[] = [
  {
    id: "fintech-analisis-documentos",
    slug: { es: "fintech-analisis-documentos", en: "fintech-document-analysis" },
    client: { es: "Fintech en etapa de crecimiento", en: "Growth-stage fintech" },
    industry: { es: "Cajas de Compensación", en: "Cajas de Compensación" },
    industryKey: "cajas-compensacion",
    date: "2026-05-10",
    problem: {
      es: "El análisis manual de documentación financiera y contractual tomaba entre 3 y 5 días por cliente, retrasando la originación de créditos.",
      en: "Manual review of financial and contractual documentation took 3 to 5 days per client, delaying loan origination.",
    },
    solution: {
      es: "Integramos un LLM con arquitectura RAG sobre la documentación regulatoria y contractual de la empresa, con validación de analistas en el circuito.",
      en: "We integrated an LLM with a RAG architecture over the company's regulatory and contractual documentation, with analysts validating outputs in the loop.",
    },
    result: {
      es: "El tiempo de análisis se redujo a menos de 4 horas, manteniendo un alto nivel de precisión validado por el equipo humano.",
      en: "Analysis time dropped to under 4 hours, while maintaining high accuracy validated by the human team.",
    },
    metrics: {
      es: [
        { value: "<4h", label: "tiempo de análisis por cliente" },
        { value: "95%", label: "precisión validada por analistas" },
      ],
      en: [
        { value: "<4h", label: "analysis time per client" },
        { value: "95%", label: "accuracy validated by analysts" },
      ],
    },
  },
  {
    id: "servicios-profesionales-roadmap-ia",
    slug: { es: "servicios-profesionales-roadmap-ia", en: "professional-services-ai-roadmap" },
    client: { es: "Firma de servicios profesionales", en: "Professional services firm" },
    industry: { es: "Arquitectura", en: "Architecture" },
    industryKey: "arquitectura",
    date: "2026-04-22",
    problem: {
      es: "La dirección no tenía claridad sobre en qué áreas invertir en IA ni cómo medir el retorno de las iniciativas propuestas.",
      en: "Leadership lacked clarity on where to invest in AI or how to measure the return of proposed initiatives.",
    },
    solution: {
      es: "Realizamos un diagnóstico de madurez, definimos un roadmap a 12 meses y priorizamos pilotos según impacto y viabilidad técnica.",
      en: "We ran a maturity assessment, defined a 12-month roadmap and prioritized pilots based on impact and technical feasibility.",
    },
    result: {
      es: "La firma validó varios casos de uso y su primer piloto alcanzó retorno positivo en menos de tres meses.",
      en: "The firm validated several use cases and its first pilot reached a positive return in under three months.",
    },
    metrics: {
      es: [
        { value: "5", label: "casos de uso validados" },
        { value: "90 días", label: "para el primer piloto con ROI positivo" },
      ],
      en: [
        { value: "5", label: "validated use cases" },
        { value: "90 days", label: "to first pilot with positive ROI" },
      ],
    },
  },
  {
    id: "educacion-asistente-admisiones",
    slug: { es: "educacion-asistente-admisiones", en: "education-admissions-assistant" },
    client: { es: "Institución de educación superior", en: "Higher education institution" },
    industry: { es: "Cajas de Compensación", en: "Cajas de Compensación" },
    industryKey: "cajas-compensacion",
    date: "2026-03-18",
    problem: {
      es: "El equipo de admisiones no alcanzaba a responder a tiempo las preguntas de miles de aspirantes durante los picos de convocatoria.",
      en: "The admissions team couldn't respond in time to thousands of applicant questions during peak enrollment periods.",
    },
    solution: {
      es: "Creamos un asistente de IA disponible 24/7 que responde preguntas frecuentes, guía el proceso de aplicación y deriva casos complejos a un asesor.",
      en: "We created a 24/7 AI assistant that answers frequently asked questions, guides applicants through the process and routes complex cases to an advisor.",
    },
    result: {
      es: "Los aspirantes reciben respuesta inmediata a cualquier hora, y la tasa de finalización del proceso de aplicación aumentó de forma notable.",
      en: "Applicants get an immediate answer at any hour, and the application completion rate rose noticeably.",
    },
    metrics: {
      es: [
        { value: "+25%", label: "tasa de finalización de la aplicación" },
        { value: "24/7", label: "atención a aspirantes" },
      ],
      en: [
        { value: "+25%", label: "application completion rate" },
        { value: "24/7", label: "applicant support" },
      ],
    },
  },
  {
    id: "retail-vinos-whatsapp-bot",
    slug: { es: "vinos-whatsapp-bot", en: "wine-whatsapp-bot" },
    client: { es: "Distribuidora de vinos", en: "Wine distributor" },
    industry: { es: "Restaurantes", en: "Restaurants" },
    industryKey: "restaurantes",
    date: "2026-08-20",
    problem: {
      es: "Una distribuidora de vinos con más de cien referencias gestionaba todas sus ventas manualmente por WhatsApp — fotos del catálogo, cálculo de totales y seguimiento de pedidos a mano —, un modelo que se volvía insostenible a medida que crecía el volumen de clientes.",
      en: "A wine distributor with more than a hundred products managed all of its sales manually over WhatsApp — sending catalog photos, calculating totals, and tracking orders by hand — a model that became unsustainable as its customer volume grew.",
    },
    solution: {
      es: "Kempro diseñó y desplegó, junto a la propietaria del negocio (sin experiencia técnica previa), un bot de WhatsApp con catálogo, carrito persistente y cobro integrado, adaptando el módulo de pagos y la verificación de WhatsApp Business sobre la marcha cuando surgieron bloqueos de proveedores externos.",
      en: "Kempro designed and deployed, together with the business owner (who had no prior technical experience), a WhatsApp bot with a catalog, a persistent cart, and integrated checkout — adapting the payment module and the WhatsApp Business verification on the fly when third-party blockers came up.",
    },
    result: {
      es: "La arquitectura quedó completamente lista y probada de extremo a extremo antes de conectar el número de producción: el negocio podrá atender pedidos las 24 horas sin intervención manual y sin errores de cálculo en los totales.",
      en: "The architecture is fully built and tested end to end, ready to go live: the business will be able to handle orders 24/7 without manual intervention and with no calculation errors in order totals.",
    },
    metrics: {
      es: [
        { value: "+100", label: "referencias del catálogo digitalizadas" },
        { value: "24/7", label: "atención de pedidos sin intervención manual" },
      ],
      en: [
        { value: "+100", label: "catalog products digitized" },
        { value: "24/7", label: "order handling without manual intervention" },
      ],
    },
  },
  {
    id: "construccion-optimizacion-viajes-corporativos",
    slug: {
      es: "optimizacion-viajes-corporativos-ventanas-puertas",
      en: "corporate-travel-optimization-windows-doors",
    },
    client: {
      es: "Proveedor de ventanas y puertas para edificaciones",
      en: "Windows & doors supplier for construction",
    },
    industry: { es: "Construcción", en: "Construction" },
    industryKey: "construccion",
    date: "2026-08-28",
    problem: {
      es: "Los equipos técnicos y comerciales de un proveedor de ventanas y puertas viajaban con regularidad para atender obras y coordinar instalaciones, reservando cada viaje de forma reactiva y sin aprovechar los beneficios ya incluidos en su tarjeta corporativa, lo que generaba sobrecostos evitables mes a mes.",
      en: "The technical and sales teams of a windows-and-doors supplier traveled regularly to support projects and coordinate installations, booking each trip reactively and without taking advantage of the benefits already included in their corporate card — generating avoidable overcosts month after month.",
    },
    solution: {
      es: "Kempro puso a prueba su metodología de optimización de viajes en un piloto que abarcó todos los viajes corporativos de un trimestre: comparó tarifas día por día alrededor de cada fecha objetivo, ajustó el nivel de servicio de cada viajero según su necesidad real, y auditó los beneficios ya incluidos en la tarjeta corporativa para evitar pagar dos veces por lo mismo — todo documentado en reportes replicables por el propio equipo de viajes.",
      en: "Kempro tested its travel-optimization methodology in a pilot that covered every corporate trip over a full quarter: comparing day-by-day fares around each target date, adjusting each traveler's service level to their actual need, and auditing the benefits already included in the corporate card to avoid paying twice for the same thing — all documented in reports the company's own travel team can repeat on its own.",
    },
    result: {
      es: "El piloto trimestral logró un ahorro total del 25% en los viajes corporativos del equipo técnico y comercial, manteniendo la misma cobertura de equipaje y de los servicios que sí eran necesarios.",
      en: "The quarter-long pilot achieved a total 25% savings across the technical and sales team's corporate trips, while keeping the same baggage coverage and the services that were actually needed.",
    },
    metrics: {
      es: [
        { value: "-25%", label: "ahorro total en viajes corporativos durante el trimestre piloto" },
        { value: "3 pasos", label: "metodología replicable por el propio equipo de viajes" },
      ],
      en: [
        { value: "-25%", label: "total savings on corporate trips during the pilot quarter" },
        { value: "3 steps", label: "replicable methodology, run by the company's own travel team" },
      ],
    },
  },
  {
    id: "salud-gobernanza-documental-copilot",
    slug: { es: "gobernanza-documental-con-copilot", en: "document-governance-with-copilot" },
    client: { es: "Aseguradora de salud internacional", en: "International health insurer" },
    industry: { es: "Salud", en: "Healthcare" },
    industryKey: "salud",
    date: "2026-08-25",
    problem: {
      es: "La documentación de procesos normativos y regulatorios vivía dispersa entre las distintas líneas de negocio de una aseguradora y prestadora de servicios de salud, sin un repositorio único, sin control de acceso por negocio, y sin garantía de que las versiones en uso fueran realmente las vigentes.",
      en: "Regulatory and process documentation lived scattered across the business lines of a health insurer and healthcare provider, with no single repository, no per-business access control, and no guarantee that the versions in use were actually current.",
    },
    solution: {
      es: "Kempro consolidó toda la documentación normativa en un sitio de comunicaciones de SharePoint organizado por línea de negocio, con control de acceso por negocio; automatizó con Power Automate la aprobación de nuevas versiones por parte de los propietarios de cada proceso, junto con un flujo de revalidación anual obligatoria; y construyó sobre esa arquitectura un asistente corporativo con Copilot Chat que pone la información al alcance de todos con los mismos rigores de acceso, incluida su disponibilidad omnicanal para los clientes.",
      en: "Kempro consolidated all regulatory documentation into a SharePoint communication site organized by business line, with access control per business; automated new-version approval through Power Automate, routed to each process owner, along with a mandatory annual revalidation flow; and built a corporate AI assistant with Copilot Chat on top of that architecture, making the information available to everyone under the same access controls — including omnichannel availability for clients.",
    },
    result: {
      es: "La empresa pasó de documentación dispersa a un repositorio único, gobernado y siempre vigente, con un asistente de IA que responde con la información oficial respetando los permisos de cada negocio.",
      en: "The company moved from scattered documentation to a single, governed, always-current repository, with an AI assistant that answers using official information while respecting each business's access permissions.",
    },
    metrics: {
      es: [
        { value: "100%", label: "procesos normativos centralizados en un solo sitio, con control de acceso por negocio" },
        { value: "Anual", label: "revalidación automática de la vigencia de cada proceso" },
      ],
      en: [
        { value: "100%", label: "normative processes centralized in one site, with per-business access control" },
        { value: "Annual", label: "automatic revalidation of each process's currency" },
      ],
    },
  },
  {
    id: "kempro-sitio-con-claude",
    slug: { es: "nuestro-propio-sitio-con-claude", en: "our-own-website-with-claude" },
    client: { es: "Kempro", en: "Kempro" },
    industry: { es: "Tecnología", en: "Technology" },
    industryKey: "tecnologia",
    date: "2026-08-21",
    isInternal: true,
    problem: {
      es: "Kempro necesitaba lanzar su propio sitio web bilingüe, con contenido real y no genérico, sin depender de una agencia externa ni de un equipo de desarrollo dedicado.",
      en: "Kempro needed to launch its own bilingual website, with real (not generic) content, without relying on an outside agency or a dedicated development team.",
    },
    solution: {
      es: "El equipo usó el mismo método de IA que ofrece a sus clientes: combinó Cowork para definir diseño y contenido, y Claude Code para construir el sitio directamente a partir de instrucciones precisas.",
      en: "The team used the same AI-driven method it offers clients: Cowork to define design and content, and Claude Code to build the site directly from precise instructions.",
    },
    result: {
      es: "Kempro lanzó su propio sitio bilingüe con una arquitectura de contenido consistente entre español e inglés, aplicando internamente el mismo proceso que ofrece a sus clientes.",
      en: "Kempro launched its own bilingual website with a consistent content architecture between Spanish and English, applying internally the same process it offers clients.",
    },
    metrics: {
      es: [
        { value: "2", label: "idiomas lanzados desde el día uno (español e inglés)" },
        { value: "100%", label: "contenido real, sin texto de relleno, desde el primer borrador" },
      ],
      en: [
        { value: "2", label: "languages launched from day one (Spanish and English)" },
        { value: "100%", label: "real content, no placeholder text, from the first draft" },
      ],
    },
  },
];

// Every case study must define a slug for every supported locale (see the
// "Convenciones de contenido bilingüe" section in CLAUDE.md) — the locale
// switcher relies on this relation to resolve the equivalent slug when
// changing language. Catch a missing translation at build time rather than
// producing a broken link or a silent 404 in production.
for (const caseStudy of data) {
  for (const locale of routing.locales) {
    if (!caseStudy.slug[locale]) {
      throw new Error(
        `[lib/data/case-studies.ts] Case study "${caseStudy.id}" is missing a "${locale}" slug. Every case study must define a slug for every locale — see "Convenciones de contenido bilingüe" in CLAUDE.md.`,
      );
    }
  }
}

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return data.map((c) => {
    const client = c.client[locale];
    const industry = c.industry[locale];
    const problem = c.problem[locale];
    const solution = c.solution[locale];
    const result = c.result[locale];
    const metrics = c.metrics[locale];

    return {
      id: c.id,
      slug: c.slug[locale],
      client,
      industry,
      industryKey: c.industryKey,
      date: c.date,
      problem,
      solution,
      result,
      metrics,
      image: INDUSTRY_IMAGE[c.industryKey],
      content: buildContent(locale, { client, industry, problem, solution, result, metrics, isInternal: c.isInternal }),
    };
  });
}

export function getCaseStudy(locale: Locale, slug: string): CaseStudy | undefined {
  return getCaseStudies(locale).find((c) => c.slug === slug);
}

// Looks up a case study by its stable id (locale-independent) instead of
// its slug (locale-specific) — used wherever the caller needs to reference
// a specific case study without depending on any one locale's slug value.
export function getCaseStudyById(locale: Locale, id: string): CaseStudy | undefined {
  return getCaseStudies(locale).find((c) => c.id === id);
}
