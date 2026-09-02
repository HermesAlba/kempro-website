import { routing, type Locale } from "@/i18n/routing";
import type { ContentBlock } from "@/components/blog/block-renderer";

export type ServiceIcon =
  | "strategy"
  | "automation"
  | "integration"
  | "intranet"
  | "web"
  | "process";

export type Service = {
  id: string;
  slug: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  benefits: string[];
  /** Detail-page body content — Resumen / Qué incluye / Cómo trabajamos /
   * Para quién es, in the same block shape (and rendered by the same
   * BlockRenderer) as blog post and case study content — see
   * components/blog/block-renderer.tsx. Built from this service's own
   * description/benefits/howItWorks/idealFor fields rather than
   * hand-authored, so every service gets real, non-generic prose without
   * duplicating facts already captured above. */
  content: ContentBlock[];
};

// Builds the detail page's body from a service's own resolved fields. No
// new facts are invented beyond what's already in
// description/benefits/howItWorks/idealFor.
//
// Benefits are deliberately NOT included here anymore — they used to be a
// plain "Qué incluye"/"What's included" text list block like the others,
// duplicating the same data the page also renders as its own highlighted
// checkmark section (see the Benefits block in
// app/[locale]/servicios/[slug]/page.tsx, which reads service.benefits
// directly). Keeping them out of `content` avoids showing the same list
// twice on one page.
function buildContent(
  locale: Locale,
  fields: {
    description: string;
    howItWorks: string[];
    idealFor: string;
  },
): ContentBlock[] {
  const { description, howItWorks, idealFor } = fields;

  if (locale === "en") {
    return [
      { type: "heading", text: "Overview" },
      { type: "paragraph", text: description },

      { type: "heading", text: "How we work" },
      { type: "list", items: howItWorks },

      { type: "heading", text: "Who it's for" },
      { type: "paragraph", text: idealFor },
    ];
  }

  return [
    { type: "heading", text: "Resumen" },
    { type: "paragraph", text: description },

    { type: "heading", text: "Cómo trabajamos" },
    { type: "list", items: howItWorks },

    { type: "heading", text: "Para quién es" },
    { type: "paragraph", text: idealFor },
  ];
}

const data: Record<
  string,
  {
    slug: Record<Locale, string>;
    icon: ServiceIcon;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    benefits: Record<Locale, string[]>;
    howItWorks: Record<Locale, string[]>;
    idealFor: Record<Locale, string>;
  }
> = {
  strategy: {
    slug: { es: "estrategia-de-ia", en: "ai-strategy" },
    icon: "strategy",
    title: {
      es: "Estrategia de IA",
      en: "AI Strategy",
    },
    description: {
      es: "Diagnosticamos el nivel de madurez de tu organización y diseñamos una hoja de ruta de adopción de IA alineada a tus objetivos de negocio.",
      en: "We assess your organization's AI maturity and design an adoption roadmap aligned with your business goals.",
    },
    benefits: {
      es: [
        "Diagnóstico de madurez en IA y datos",
        "Roadmap priorizado por impacto y viabilidad",
        "Casos de uso validados con ROI estimado",
        "Acompañamiento a equipos de liderazgo",
      ],
      en: [
        "AI and data maturity assessment",
        "Roadmap prioritized by impact and feasibility",
        "Validated use cases with estimated ROI",
        "Executive leadership guidance",
      ],
    },
    howItWorks: {
      es: [
        "Sesiones de diagnóstico con las áreas clave para mapear procesos, datos y objetivos de negocio",
        "Evaluación de madurez en IA y datos frente a los objetivos priorizados",
        "Construcción de un roadmap con casos de uso ordenados por impacto y viabilidad",
        "Presentación de resultados y acompañamiento en la decisión de los siguientes pasos",
      ],
      en: [
        "Diagnostic sessions with key teams to map processes, data, and business objectives",
        "AI and data maturity assessment against your prioritized goals",
        "A roadmap of use cases ordered by impact and feasibility",
        "Results presentation and guidance on deciding the next steps",
      ],
    },
    idealFor: {
      es: "Es el punto de partida ideal si tu empresa quiere adoptar IA pero todavía no tiene claro por dónde empezar, o si ya lanzó iniciativas aisladas sin una hoja de ruta que las conecte. Es el compromiso de menor riesgo antes de cualquier proyecto de implementación.",
      en: "It's the ideal starting point if your company wants to adopt AI but isn't yet clear on where to begin, or if you've already launched isolated initiatives with no roadmap connecting them. It's the lowest-risk commitment before any implementation project.",
    },
  },
  automation: {
    slug: { es: "agentes-y-automatizacion", en: "ai-agents-automation" },
    icon: "automation",
    title: {
      es: "Agentes y Automatización",
      en: "Agents & Automation",
    },
    description: {
      es: "Diseñamos e implementamos agentes de IA que automatizan procesos operativos y flujos de trabajo de extremo a extremo.",
      en: "We design and deploy AI agents that automate operational processes and workflows end to end.",
    },
    benefits: {
      es: [
        "Automatización de tareas repetitivas de alto volumen",
        "Agentes multi-paso con supervisión humana (human-in-the-loop)",
        "Reducción de tiempos de ciclo y errores operativos",
        "Integración con CRM, ERP y mesas de ayuda",
      ],
      en: [
        "Automation of high-volume repetitive tasks",
        "Multi-step agents with human-in-the-loop oversight",
        "Reduced cycle times and operational errors",
        "Integration with CRM, ERP and help desk tools",
      ],
    },
    howItWorks: {
      es: [
        "Identificamos los procesos con mayor volumen y menor variabilidad para priorizar el primer agente",
        "Diseñamos el flujo del agente, incluyendo los puntos de supervisión humana",
        "Integramos el agente con tu CRM, ERP o mesa de ayuda existente",
        "Medimos tiempos de ciclo y tasa de error antes y después, y ajustamos en producción",
      ],
      en: [
        "We identify the highest-volume, lowest-variability processes to prioritize the first agent",
        "We design the agent's workflow, including human-supervision checkpoints",
        "We integrate the agent with your existing CRM, ERP, or help desk",
        "We measure cycle time and error rate before and after, then tune it in production",
      ],
    },
    idealFor: {
      es: "Ideal para equipos que ya identificaron procesos repetitivos de alto volumen (soporte, back office, operaciones) y quieren reducir tiempos de ciclo y errores sin reemplazar a su equipo humano.",
      en: "Ideal for teams that have already identified high-volume repetitive processes (support, back office, operations) and want to cut cycle times and errors without replacing their human team.",
    },
  },
  integration: {
    slug: { es: "integracion-de-llms", en: "llm-integration" },
    icon: "integration",
    title: {
      es: "Integración de LLMs",
      en: "LLM Integration",
    },
    description: {
      es: "Conectamos modelos de lenguaje a tus sistemas, datos y APIs existentes de forma segura, gobernada y escalable.",
      en: "We connect large language models to your existing systems, data and APIs in a secure, governed and scalable way.",
    },
    benefits: {
      es: [
        "Arquitectura RAG sobre tus fuentes de datos internas",
        "APIs y SDKs a medida para tus equipos de producto",
        "Gobernanza, seguridad y control de costos de modelos",
        "Monitoreo de calidad y observabilidad de respuestas",
      ],
      en: [
        "RAG architecture over your internal data sources",
        "Custom APIs and SDKs for your product teams",
        "Governance, security and model cost control",
        "Quality monitoring and response observability",
      ],
    },
    howItWorks: {
      es: [
        "Mapeamos tus fuentes de datos internas y definimos qué información puede consultar el modelo",
        "Construimos la arquitectura RAG y las APIs y SDKs necesarios para tus equipos de producto",
        "Definimos políticas de gobernanza, seguridad y control de costos por modelo",
        "Ponemos en marcha monitoreo de calidad y observabilidad sobre las respuestas en producción",
      ],
      en: [
        "We map your internal data sources and define what information the model can query",
        "We build the RAG architecture and the APIs and SDKs your product teams need",
        "We define governance, security, and per-model cost-control policies",
        "We put quality monitoring and response observability in place in production",
      ],
    },
    idealFor: {
      es: "Pensado para empresas que ya usan modelos de lenguaje de forma puntual (o quieren empezar) y necesitan conectar esos modelos a sus datos y sistemas propios de forma segura y auditable, no solo a través de una interfaz de chat genérica.",
      en: "Built for companies already using language models on an ad hoc basis (or ready to start) that need to connect those models to their own data and systems securely and auditably — not just through a generic chat interface.",
    },
  },
  intranet: {
    slug: { es: "intranetia-365", en: "intranetia-365" },
    icon: "intranet",
    title: {
      es: "IntranetIA 365",
      en: "IntranetIA 365",
    },
    description: {
      es: "Intranets corporativas sobre SharePoint, ShortPoint y agentes de IA Copilot o Claude: diseño profesional, respuestas instantáneas, usando tu licencia de Microsoft 365.",
      en: "Corporate intranets built on SharePoint, ShortPoint, and Copilot or Claude AI agents: professional design, instant answers, powered by the Microsoft 365 license you already have.",
    },
    benefits: {
      es: [
        "Sin plataforma nueva: utiliza tu licencia de Microsoft 365",
        "Diseño sin desarrollo a medida: páginas de alto impacto con ShortPoint, mantenibles por tu propio equipo",
        "Respuestas al instante: agentes de IA que responden preguntas frecuentes con información oficial, sin esperar a RR. HH. o TI",
        "Lista para crecer: arquitectura multi-sede para tus oficinas, países o unidades de negocio",
        "Un solo canal: toda tu empresa consume la información de la misma forma, sin canales paralelos",
      ],
      en: [
        "No new platform: use the Microsoft 365 license you already have",
        "No custom development: high-impact pages built with ShortPoint, maintainable by your own team",
        "Instant answers: AI agents that answer frequently asked questions with official information, without waiting on HR or IT",
        "Ready to scale: multi-site architecture for offices, countries, or business units",
        "One single channel: the whole company consumes information the same way, with no parallel channels",
      ],
    },
    howItWorks: {
      es: [
        "Auditamos tu licencia de Microsoft 365 y la estructura actual de tu intranet o SharePoint",
        "Diseñamos las páginas de alto impacto con ShortPoint, sin desarrollo a medida",
        "Configuramos agentes de IA (Copilot o Claude) entrenados con tu información oficial",
        "Habilitamos la arquitectura multi-sede y capacitamos a tu equipo para mantenerla",
      ],
      en: [
        "We audit your Microsoft 365 license and your current intranet or SharePoint setup",
        "We design high-impact pages with ShortPoint, with no custom development",
        "We configure AI agents (Copilot or Claude) trained on your official information",
        "We enable the multi-site architecture and train your team to maintain it",
      ],
    },
    idealFor: {
      es: "Ideal para empresas con múltiples sedes o unidades de negocio donde la información vive dispersa en canales paralelos (correos, chats, carpetas personales), y que ya cuentan con licencia de Microsoft 365 pero no la están aprovechando.",
      en: "Ideal for companies with multiple offices or business units where information lives scattered across parallel channels (emails, chats, personal folders), and that already hold a Microsoft 365 license but aren't making the most of it.",
    },
  },
  web: {
    slug: { es: "presencia-web-360", en: "web-presence-360" },
    icon: "web",
    title: {
      es: "Presencia Web 360",
      en: "360° Web Presence",
    },
    description: {
      es: "Diseñamos y desarrollamos tu sitio web con apoyo de IA: SEO y GEO (ChatGPT, Gemini, Perplexity) para que tus clientes te encuentren primero, sin que pierdas el control de tu dominio, hosting y CMS.",
      en: "We design and build your website with AI support: SEO and GEO (ChatGPT, Gemini, Perplexity) so your customers find you first, without you losing control of your domain, hosting, and CMS.",
    },
    benefits: {
      es: [
        "SEO y GEO: visibilidad en buscadores tradicionales y en motores de respuesta generativa como ChatGPT, Gemini y Perplexity",
        "Diseño con apoyo de IA: metodología propia, del descubrimiento del negocio al lanzamiento y la mejora continua",
        "Control total: sigues siendo el titular de tu dominio, hosting y cuenta de CMS, sin ataduras",
        "Equipo capacitado: tu equipo queda listo para publicar contenido de forma autónoma",
        "Decisiones con datos: sitio medido y optimizado con base en datos reales, no en suposiciones",
      ],
      en: [
        "SEO and GEO: visibility in traditional search engines and in generative answer engines like ChatGPT, Gemini, and Perplexity",
        "AI-assisted design: our own methodology, from business discovery to launch and continuous improvement",
        "Full control: you remain the owner of your domain, hosting, and CMS account, with no strings attached",
        "Trained team: your team is ready to publish content independently",
        "Data-driven decisions: a site measured and optimized based on real data, not assumptions",
      ],
    },
    howItWorks: {
      es: [
        "Descubrimiento del negocio: objetivos, audiencia y estado actual de tu presencia digital",
        "Diseño y desarrollo del sitio con apoyo de IA, sobre tu propio dominio y hosting",
        "Optimización SEO y GEO para buscadores tradicionales y motores de respuesta generativa",
        "Capacitación de tu equipo y medición continua con datos reales de uso",
      ],
      en: [
        "Business discovery: goals, audience, and the current state of your digital presence",
        "AI-assisted design and development of the site, on your own domain and hosting",
        "SEO and GEO optimization for traditional search engines and generative answer engines",
        "Team training and ongoing measurement based on real usage data",
      ],
    },
    idealFor: {
      es: "Para empresas que necesitan un sitio web nuevo o renovado y quieren mantener el control total de su dominio, hosting y CMS, sin depender de una agencia para cada cambio de contenido.",
      en: "For companies that need a new or refreshed website and want to keep full control of their domain, hosting, and CMS, without depending on an agency for every content change.",
    },
  },
  process: {
    slug: { es: "processmind-ai", en: "processmind-ai" },
    icon: "process",
    title: {
      es: "ProcessMind AI",
      en: "ProcessMind AI",
    },
    description: {
      es: "Convierte la transcripción de tus reuniones de Teams en procedimientos formales con su diagrama de flujo, y los enruta automáticamente por tu circuito de aprobación en SharePoint hasta quedar publicados como versión vigente.",
      en: "Turns your Teams meeting transcripts into formal procedures with their flowchart, then routes them automatically through your SharePoint approval workflow until published as the current version.",
    },
    benefits: {
      es: [
        "Documentación al día: el procedimiento se actualiza apenas cambia el proceso, no meses después",
        "De la reunión al documento: convierte transcripciones de Teams en procedimientos formales, sin reprocesos manuales",
        "Diagrama de flujo automático: genera el flujograma correspondiente sin usar Visio",
        "Aprobación integrada: se enruta solo por tu circuito de aprobación en SharePoint hasta quedar publicado",
        "Lista para auditorías: ideal para certificaciones ISO 9001, auditorías y procesos de due diligence",
      ],
      en: [
        "Always up to date: the procedure updates as soon as the process changes, not months later",
        "From meeting to document: turns Teams transcripts into formal procedures, with no manual rework",
        "Automatic flowcharts: generates the corresponding flowchart with no need for Visio",
        "Built-in approval: routes automatically through your SharePoint approval workflow until published",
        "Audit-ready: ideal for ISO 9001 certifications, audits, and due diligence processes",
      ],
    },
    howItWorks: {
      es: [
        "Conectamos ProcessMind AI a tus reuniones de Teams donde se discuten los procedimientos",
        "El sistema transcribe la reunión y genera un borrador del procedimiento con su diagrama de flujo",
        "El borrador se enruta automáticamente por tu circuito de aprobación existente en SharePoint",
        "Al aprobarse, el procedimiento queda publicado como la versión vigente, lista para auditoría",
      ],
      en: [
        "We connect ProcessMind AI to the Teams meetings where procedures are discussed",
        "The system transcribes the meeting and drafts the procedure along with its flowchart",
        "The draft routes automatically through your existing SharePoint approval workflow",
        "Once approved, the procedure is published as the current version, ready for audit",
      ],
    },
    idealFor: {
      es: "Ideal para empresas con procesos certificados (ISO 9001 u otras normas) donde la documentación se desactualiza más rápido de lo que el equipo logra mantenerla al día.",
      en: "Ideal for companies with certified processes (ISO 9001 or similar standards) where documentation goes out of date faster than the team can keep it current.",
    },
  },
};

const order: (keyof typeof data)[] = [
  "intranet",
  "web",
  "process",
  "strategy",
  "automation",
  "integration",
];

// Every service must define a slug for every supported locale (see the
// "Convenciones de contenido bilingüe" section in CLAUDE.md) — the locale
// switcher relies on this relation to resolve the equivalent slug when
// changing language. Catch a missing translation at build time rather than
// producing a broken link or a silent 404 in production.
for (const [id, service] of Object.entries(data)) {
  for (const locale of routing.locales) {
    if (!service.slug[locale]) {
      throw new Error(
        `[lib/data/services.ts] Service "${id}" is missing a "${locale}" slug. Every service
        must define a slug for every locale — see "Convenciones de contenido bilingüe" in
        CLAUDE.md.`,
      );
    }
  }
}

export function getServices(locale: Locale): Service[] {
  return order.map((key) => {
    const s = data[key];
    const description = s.description[locale];
    const benefits = s.benefits[locale];
    const howItWorks = s.howItWorks[locale];
    const idealFor = s.idealFor[locale];

    return {
      id: key,
      slug: s.slug[locale],
      icon: s.icon,
      title: s.title[locale],
      description,
      benefits,
      content: buildContent(locale, { description, howItWorks, idealFor }),
    };
  });
}

export function getService(locale: Locale, slug: string): Service | undefined {
  return getServices(locale).find((s) => s.slug === slug);
}

// Exposes the raw bilingual records (both locales in one object per
// service, including howItWorks/idealFor which getServices() doesn't
// return directly — they're only baked into its derived `content` blocks)
// — used only by the one-off Sanity migration script
// (scripts/migrate-to-sanity.ts). Not used anywhere in the app itself.
export function getServicesRaw() {
  return { data, order };
}
