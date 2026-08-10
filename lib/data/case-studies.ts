import type { Locale } from "@/i18n/routing";

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  result: string;
  metrics: { value: string; label: string }[];
};

const data: {
  slug: string;
  client: string;
  industry: Record<Locale, string>;
  problem: Record<Locale, string>;
  solution: Record<Locale, string>;
  result: Record<Locale, string>;
  metrics: Record<Locale, { value: string; label: string }[]>;
}[] = [
  {
    slug: "retail-atencion-al-cliente",
    client: "Cadena de retail regional",
    industry: { es: "Retail", en: "Retail" },
    problem: {
      es: "El equipo de soporte recibía más de 5,000 tickets al mes y los tiempos de primera respuesta superaban las 24 horas, afectando la satisfacción del cliente.",
      en: "The support team received more than 5,000 tickets per month, with first-response times over 24 hours, hurting customer satisfaction.",
    },
    solution: {
      es: "Implementamos un agente de IA conectado a WhatsApp y al CRM existente, capaz de resolver consultas de primer nivel y escalar casos complejos a agentes humanos.",
      en: "We deployed an AI agent connected to WhatsApp and the existing CRM, able to resolve first-level inquiries and escalate complex cases to human agents.",
    },
    result: {
      es: "El tiempo de primera respuesta se redujo drásticamente y una parte significativa de los tickets se resuelve hoy sin intervención humana.",
      en: "First-response time dropped drastically and a significant share of tickets are now resolved without human intervention.",
    },
    metrics: {
      es: [
        { value: "-62%", label: "tiempo de primera respuesta" },
        { value: "40%", label: "tickets resueltos sin intervención humana" },
      ],
      en: [
        { value: "-62%", label: "first-response time" },
        { value: "40%", label: "tickets resolved without human intervention" },
      ],
    },
  },
  {
    slug: "logistica-optimizacion-rutas",
    client: "Operador logístico nacional",
    industry: { es: "Logística", en: "Logistics" },
    problem: {
      es: "La planificación manual de rutas y la asignación de flota consumían más de 15 horas semanales del equipo de operaciones.",
      en: "Manual route planning and fleet assignment consumed more than 15 hours per week of the operations team.",
    },
    solution: {
      es: "Diseñamos un agente de IA que analiza pedidos, condiciones de tráfico y capacidad disponible para sugerir rutas óptimas en minutos.",
      en: "We designed an AI agent that analyzes orders, traffic conditions and available capacity to suggest optimal routes in minutes.",
    },
    result: {
      es: "La empresa redujo sus costos operativos y mejoró significativamente su cumplimiento de entregas a tiempo.",
      en: "The company reduced operating costs and significantly improved on-time delivery performance.",
    },
    metrics: {
      es: [
        { value: "-30%", label: "costos de combustible" },
        { value: "+18%", label: "entregas a tiempo" },
      ],
      en: [
        { value: "-30%", label: "fuel costs" },
        { value: "+18%", label: "on-time deliveries" },
      ],
    },
  },
  {
    slug: "fintech-analisis-documentos",
    client: "Fintech en etapa de crecimiento",
    industry: { es: "Servicios Financieros", en: "Financial Services" },
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
    slug: "servicios-profesionales-roadmap-ia",
    client: "Firma de servicios profesionales",
    industry: { es: "Servicios Profesionales", en: "Professional Services" },
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
];

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return data.map((c) => ({
    slug: c.slug,
    client: c.client,
    industry: c.industry[locale],
    problem: c.problem[locale],
    solution: c.solution[locale],
    result: c.result[locale],
    metrics: c.metrics[locale],
  }));
}
