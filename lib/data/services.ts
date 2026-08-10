import type { Locale } from "@/i18n/routing";

export type ServiceIcon =
  | "strategy"
  | "automation"
  | "integration"
  | "intranet"
  | "web"
  | "process";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  benefits: string[];
};

const data: Record<
  string,
  {
    slug: string;
    icon: ServiceIcon;
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    benefits: Record<Locale, string[]>;
  }
> = {
  strategy: {
    slug: "estrategia-de-ia",
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
  },
  automation: {
    slug: "agentes-y-automatizacion",
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
  },
  integration: {
    slug: "integracion-de-llms",
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
  },
  intranet: {
    slug: "intranetia-365",
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
  },
  web: {
    slug: "presencia-web-360",
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
  },
  process: {
    slug: "processmind-ai",
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

export function getServices(locale: Locale): Service[] {
  return order.map((key) => {
    const s = data[key];
    return {
      slug: s.slug,
      icon: s.icon,
      title: s.title[locale],
      description: s.description[locale],
      benefits: s.benefits[locale],
    };
  });
}
