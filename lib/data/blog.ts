import { routing, type Locale } from "@/i18n/routing";
import { getTeam } from "@/lib/data/team";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole: string;
  authorInitials: string;
  category: string;
  categoryKey: string;
  readingTime: string;
  content: BlogBlock[];
  coverImage?: string;
};

const AUTHOR_FALLBACKS: Record<string, { role: Record<Locale, string>; initials: string }> = {
  "Marketing Kempro": {
    role: { es: "Equipo de Marketing", en: "Marketing Team" },
    initials: "MK",
  },
};

function resolveAuthor(locale: Locale, name: string): { role: string; initials: string } {
  const teamMember = getTeam(locale).find((member) => member.name === name);
  if (teamMember) {
    return { role: teamMember.role, initials: teamMember.initials };
  }

  const fallback = AUTHOR_FALLBACKS[name];
  if (fallback) {
    return { role: fallback.role[locale], initials: fallback.initials };
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return { role: "", initials };
}

// Content replaced wholesale from "KEMPRO Artículos .docx" (uploaded
// 2026-08-26) — every post's title/excerpt/content below is the client's
// final approved text, transcribed as-is. The only edits made during
// transcription were mechanical: joining a handful of words the source
// document had split mid-word (e.g. "intoimplementing" → "into
// implementing"), and one missing English paragraph on post #5 (the doc's
// EN section for "Cómo construimos el sitio de Kempro usando Claude" ended
// one paragraph short of its ES counterpart) — translated to keep parity,
// since every localized post must define both locales (see the validator
// below and "Convenciones de contenido bilingüe" in CLAUDE.md).
const data: {
  id: string;
  slug: Record<Locale, string>;
  date: string;
  author: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  category: Record<Locale, string>;
  categoryKey: string;
  readingTime: Record<Locale, string>;
  content: Record<Locale, BlogBlock[]>;
  coverImage?: string;
}[] = [
  {
    id: "ia-no-es-una-formula",
    slug: {
      es: "ia-no-es-una-formula",
      en: "ai-is-not-a-formula",
    },
    date: "2026-08-07",
    author: "Marketing Kempro",
    title: {
      es: "IA sin diagnóstico: por qué la mayoría de proyectos fracasa",
      en: "AI without diagnosis: why most projects fail",
    },
    excerpt: {
      es: "La inteligencia artificial no falla por la tecnología, sino por ignorar las condiciones reales de cada empresa. Así abordamos la IA en Kempro.",
      en: "Artificial intelligence doesn't fail because of the technology — it fails when it ignores each company's real conditions. Here's how we approach AI at Kempro.",
    },
    category: { es: "Estrategia", en: "Strategy" },
    categoryKey: "estrategia",
    readingTime: { es: "6 min de lectura", en: "6 min read" },
    content: {
      es: [
        {
          type: "paragraph",
          text: "En los últimos años hemos visto a decenas de empresas lanzarse a implementar inteligencia artificial casi como quien sigue una receta: comprar la herramienta de moda, copiar el caso de éxito que leyeron en un artículo, replicar lo que hizo la competencia. Y en la mayoría de los casos, el resultado se parece más a un experimento fallido que a una transformación real.",
        },
        {
          type: "paragraph",
          text: "No es un problema de la tecnología. Los modelos de IA disponibles hoy son, en términos generales, más que suficientes para resolver problemas reales de negocio. El problema está en cómo se decide implementarlos.",
        },
        {
          type: "heading",
          text: "La misma lección que aprendimos con los procesos, ahora con la IA",
        },
        {
          type: "paragraph",
          text: "Cuando fundamos Kempro, entendimos que ninguna solución de procesos, estructura o tecnología puede aplicarse igual en dos empresas distintas, porque cada una tiene su propia cultura, su propio nivel de compromiso gerencial, su propio presupuesto y su propio apetito de riesgo. La inteligencia artificial no es la excepción a esa regla — es, si acaso, el ejemplo más claro de ella.",
        },
        {
          type: "paragraph",
          text: "Una IA que automatiza brillantemente un proceso en una empresa con datos limpios, procesos documentados y un equipo capacitado para supervisarla, puede ser un desastre costoso en una empresa donde esos mismos datos están dispersos, los procesos viven en la cabeza de tres personas clave, y nadie tiene tiempo de validar lo que la IA está haciendo. La herramienta es la misma. Las condiciones, no.",
        },
        {
          type: "paragraph",
          text: "Volviendo a nuestra propia analogía: así como una reacción química no ocurre solo porque existan los reactivos correctos, sino porque también están presentes la temperatura, la presión y el catalizador adecuados, un proyecto de IA no tiene éxito solo porque la tecnología funcione — necesita que las condiciones organizacionales estén dadas para que esa tecnología realmente reaccione con el negocio.",
        },
        {
          type: "heading",
          text: "Cómo abordamos la IA en Kempro",
        },
        {
          type: "paragraph",
          text: "Antes de recomendar cualquier herramienta o modelo, diagnosticamos las condiciones reales: qué tan confiables y accesibles son los datos disponibles, qué tan dispuesto está el liderazgo a sostener el cambio más allá del entusiasmo inicial, qué nivel de riesgo está la organización dispuesta a asumir con decisiones parcialmente automatizadas, y qué tan preparado está el equipo para trabajar junto a estas herramientas, no reemplazado por ellas.",
        },
        {
          type: "paragraph",
          text: "Solo después de ese diagnóstico definimos si el primer paso debe ser un caso de uso pequeño y visible, o si, por el contrario, la empresa necesita primero ordenar sus procesos y sus datos antes de pensar siquiera en automatizar algo con IA. A veces la recomendación más honesta que podemos dar es: todavía no.",
        },
        {
          type: "heading",
          text: "La IA amplifica lo que ya existe",
        },
        {
          type: "paragraph",
          text: "Quizás la idea más importante que hemos aprendido es esta: la inteligencia artificial no arregla procesos desordenados, los amplifica. Un proceso ineficiente ejecutado más rápido por una IA sigue siendo un proceso ineficiente — solo que ahora falla a mayor escala y con menos supervisión humana.",
        },
        {
          type: "paragraph",
          text: "Por eso, para nosotros, hablar de IA nunca es solo hablar de tecnología. Es hablar, otra vez, de las mismas variables que llevan definiendo nuestro trabajo desde el origen de Kempro: la cultura de la empresa, su disciplina de procesos, y su honestidad para reconocer en qué condiciones reales está partiendo.",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "In recent years we've watched dozens of companies rush into implementing artificial intelligence almost like following a recipe: buy the trendy tool, copy the success story they read in an article, replicate whatever the competition did. And in most cases, the result looks more like a failed experiment than a real transformation.",
        },
        {
          type: "paragraph",
          text: "It's not a technology problem. The AI models available today are, generally speaking, more than capable of solving real business problems. The problem lies in how the decision to implement them is made.",
        },
        {
          type: "heading",
          text: "The same lesson we learned with processes, now applied to AI",
        },
        {
          type: "paragraph",
          text: "When we founded Kempro, we understood that no process, structure, or technology solution can be applied the same way across two different companies, because each one has its own culture, its own level of management commitment, its own budget, and its own appetite for risk. Artificial intelligence is no exception to that rule — if anything, it's the clearest example of it.",
        },
        {
          type: "paragraph",
          text: "An AI that brilliantly automates a process in a company with clean data, documented processes, and a team trained to oversee it can be a costly disaster in a company where that same data is scattered, processes live in the heads of three key people, and no one has time to validate what the AI is doing. The tool is the same. The conditions are not.",
        },
        {
          type: "paragraph",
          text: "Going back to our own analogy: just as a chemical reaction doesn't happen simply because the right reactants are present, but because the right temperature, pressure, and catalyst are also in place, an AI project doesn't succeed just because the technology works — it needs the right organizational conditions for that technology to actually react with the business.",
        },
        {
          type: "heading",
          text: "How we approach AI at Kempro",
        },
        {
          type: "paragraph",
          text: "Before recommending any tool or model, we diagnose the real conditions: how reliable and accessible the available data is, how willing leadership is to sustain the change beyond initial enthusiasm, what level of risk the organization is willing to take on with partially automated decisions, and how prepared the team is to work alongside these tools, not be replaced by them.",
        },
        {
          type: "paragraph",
          text: "Only after that diagnosis do we define whether the first step should be a small, visible use case, or whether the company instead needs to first put its processes and data in order before even considering automating anything with AI. Sometimes the most honest recommendation we can give is: not yet.",
        },
        {
          type: "heading",
          text: "AI amplifies what already exists",
        },
        {
          type: "paragraph",
          text: "Perhaps the most important idea we've learned is this: artificial intelligence doesn't fix disorganized processes, it amplifies them. An inefficient process executed faster by an AI is still an inefficient process — it just now fails at greater scale and with less human oversight.",
        },
        {
          type: "paragraph",
          text: "That's why, for us, talking about AI is never just talking about technology. It's talking, once again, about the same variables that have defined our work since Kempro's founding: a company's culture, its process discipline, and its honesty in recognizing the real conditions it's starting from.",
        },
      ],
    },
  },
  {
    id: "primera-decision-de-ia",
    slug: {
      es: "primera-decision-de-ia",
      en: "first-ai-decision",
    },
    date: "2026-08-07",
    author: "Marketing Kempro",
    title: {
      es: "La decisión de IA que la mayoría de las empresas se salta",
      en: "The AI decision most companies skip",
    },
    excerpt: {
      es: "Antes de comparar modelos de IA, la pregunta correcta es dónde vive ya el trabajo de tu organización. Gobierno, seguridad y datos primero — el piloto viene después.",
      en: "Before comparing AI models, the right question is where your organization's work already lives. Governance, security, and data come first — the pilot comes after.",
    },
    category: { es: "Estrategia", en: "Strategy" },
    categoryKey: "estrategia",
    readingTime: { es: "8 min de lectura", en: "8 min read" },
    content: {
      es: [
        {
          type: "paragraph",
          text: "Cada vez con más frecuencia, la pregunta que reciben los comités directivos ya no es si deben adoptar inteligencia artificial. Es cómo hacerlo de forma gobernada, segura y enfocada en valor real, para sus usuarios, sus equipos y su operación.",
        },
        {
          type: "paragraph",
          text: "Y sin embargo, la mayoría de las organizaciones sigue empezando esta conversación por el lado equivocado: comparando modelos de lenguaje entre sí, en vez de preguntarse primero dónde vive hoy el trabajo real de su gente.",
        },
        {
          type: "heading",
          text: "Elegir la plataforma antes que el modelo",
        },
        {
          type: "paragraph",
          text: "Antes de decidir qué inteligencia artificial usar, vale la pena preguntarse algo más simple: ¿dónde están ya los correos, los documentos, las reuniones y el conocimiento institucional de la organización? Para la mayoría de las empresas medianas y grandes en la región, la respuesta es Microsoft 365.",
        },
        {
          type: "paragraph",
          text: "Esa respuesta debería pesar más en la decisión de lo que normalmente pesa. Una IA que opera nativamente sobre el tenant y los permisos que ya existen —integrada en Outlook, Word, Excel, Teams y SharePoint— reduce la fricción cultural de adopción, porque no le pide a nadie aprender una herramienta nueva desde cero. Herramientas de propósito general como ChatGPT Enterprise o Claude Enterprise pueden ser extraordinarias para tareas específicas de análisis o redacción, pero como plataforma inicial de una organización que ya vive dentro del ecosistema Microsoft, funcionan como complementos especializados, no como el punto de partida.",
        },
        {
          type: "paragraph",
          text: "Aquí aplica la misma idea que hemos repetido en otros artículos: la decisión correcta no depende de cuál herramienta es \"mejor\" en abstracto, sino de qué tan bien encaja con las condiciones reales — tecnológicas, culturales y de gobierno — que la organización ya tiene.",
        },
        {
          type: "heading",
          text: "Por qué ciertos sectores son candidatos de alto valor",
        },
        {
          type: "paragraph",
          text: "No todas las organizaciones se benefician igual de esta primera ola de IA. Los casos de mayor valor suelen compartir cuatro características: múltiples líneas de servicio operando en paralelo, alta carga documental (políticas, requisitos, convenios, evidencia de cumplimiento), atención omnicanal donde el usuario espera continuidad entre canales presenciales y digitales, y una exigencia fuerte de transparencia y trazabilidad frente a terceros o entes de control.",
        },
        {
          type: "paragraph",
          text: "Cuanto más amplio es el portafolio de servicios y más distribuida la operación, mayor es el valor potencial de una IA que ayude a unificar conocimiento disperso, acelerar la respuesta y reducir la fricción operativa entre áreas.",
        },
        {
          type: "heading",
          text: "Los dolores más probables — y la trampa de asumirlos sin validarlos",
        },
        {
          type: "paragraph",
          text: "En este tipo de organizaciones, casi siempre aparecen los mismos síntomas: información dispersa entre áreas, correos y sitios distintos; dependencia excesiva del conocimiento de un puñado de personas clave; tiempo desproporcionado invertido en consolidar reportes, minutas y presentaciones; variabilidad en la calidad de respuesta al usuario final; y sobrecarga operativa en tareas repetitivas de búsqueda, resumen y redacción.",
        },
        {
          type: "paragraph",
          text: "Es tentador asumir estos dolores como un diagnóstico ya hecho. No lo son — son hipótesis razonables que deben validarse formalmente al inicio de cualquier proyecto, no supuestos sobre los que se construye un roadmap completo.",
        },
        {
          type: "heading",
          text: "Gobierno antes que pilotos",
        },
        {
          type: "paragraph",
          text: "El orden importa más de lo que parece. Antes de lanzar cualquier piloto de IA, una organización necesita resolver, en secuencia: gobierno (ownership claro, política de uso, un comité que combine negocio, TI, seguridad y datos), seguridad (acceso condicional, revisión de permisos heredados, principio de mínimo privilegio), y calidad de datos (clasificación, limpieza de repositorios críticos, contenido priorizado). Solo después de eso tiene sentido hablar de piloto y, más adelante, de adopción a escala.",
        },
        {
          type: "paragraph",
          text: "Saltarse este orden — empezar comprando licencias y \"ya veremos\" con la seguridad — es la forma más común de convertir una oportunidad real en un riesgo reputacional.",
        },
        {
          type: "heading",
          text: "El riesgo real no es la IA en sí misma",
        },
        {
          type: "paragraph",
          text: "Vale la pena decirlo con claridad: la inteligencia artificial generativa no crea permisos nuevos. Acelera el acceso a lo que ya estaba ahí. El riesgo principal casi nunca es la tecnología — es el contenido sobreexpuesto, mal clasificado o mal gobernado que esa tecnología ahora puede encontrar y usar mucho más rápido que una persona.",
        },
        {
          type: "paragraph",
          text: "Por eso la mejor adopción de IA no comienza comprando licencias. Comienza reduciendo el riesgo de sobreexposición y ganando visibilidad real sobre dónde vive el dato sensible.",
        },
        {
          type: "heading",
          text: "Escalar con evidencia, no con entusiasmo",
        },
        {
          type: "paragraph",
          text: "Un roadmap responsable suele verse así: unas semanas de preparación (gobierno, permisos, datos), seguidas de un piloto de dos a tres meses con casos de uso medibles y visibles para el negocio, luego una fase de escalamiento controlado apoyada en evidencia real de valor, y finalmente una etapa continua de optimización.",
        },
        {
          type: "paragraph",
          text: "Los indicadores que importan no son los que generan entusiasmo interno, sino los que demuestran valor de negocio: tiempo ahorrado en redacción y búsqueda, reducción real en tiempos de respuesta, nivel de adopción por área, y ausencia de incidentes de seguridad o cumplimiento asociados al uso de estas herramientas.",
        },
        {
          type: "heading",
          text: "La decisión que de verdad importa",
        },
        {
          type: "paragraph",
          text: "La mejor primera decisión de una organización frente a la IA no es comprar varias herramientas a la vez, con la esperanza de que alguna funcione. Es elegir una plataforma gobernable que encaje con las condiciones que ya tiene, demostrar valor rápido con casos concretos, y escalar solo cuando la evidencia — no el entusiasmo — lo respalde.",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "More and more often, the question boards and executive committees are asking isn't whether to adopt artificial intelligence. It's how to do it in a governed, secure way that's focused on real value — for their users, their teams, and their operations.",
        },
        {
          type: "paragraph",
          text: "And yet, most organizations still start this conversation from the wrong angle: comparing language models against each other, instead of first asking where their people's actual work already lives.",
        },
        {
          type: "heading",
          text: "Choosing the platform before the model",
        },
        {
          type: "paragraph",
          text: "Before deciding which AI to use, it's worth asking something simpler: where do the organization's emails, documents, meetings, and institutional knowledge already live? For most mid-size and large companies in the region, the answer is Microsoft 365.",
        },
        {
          type: "paragraph",
          text: "That answer should carry more weight in the decision than it usually does. An AI that operates natively on the existing tenant and permissions — integrated into Outlook, Word, Excel, Teams, and SharePoint — reduces the cultural friction of adoption, because it doesn't ask anyone to learn a new tool from scratch. General-purpose tools like ChatGPT Enterprise or Claude Enterprise can be excellent for specific analysis or writing tasks, but as the initial platform for an organization that already lives inside the Microsoft ecosystem, they work as specialized complements, not as the starting point.",
        },
        {
          type: "paragraph",
          text: "The same idea we've repeated in other articles applies here: the right decision doesn't depend on which tool is \"best\" in the abstract, but on how well it fits the real conditions — technological, cultural, and governance-related — the organization already has.",
        },
        {
          type: "heading",
          text: "Why certain sectors are high-value candidates",
        },
        {
          type: "paragraph",
          text: "Not every organization benefits equally from this first wave of AI. The highest-value cases tend to share four traits: multiple service lines running in parallel, heavy documentation load (policies, requirements, agreements, compliance evidence), omnichannel service where users expect continuity between in-person and digital channels, and strong transparency and traceability requirements toward third parties or regulators.",
        },
        {
          type: "paragraph",
          text: "The broader the service portfolio and the more distributed the operation, the greater the potential value of an AI that helps unify scattered knowledge, speed up response times, and reduce operational friction between departments.",
        },
        {
          type: "heading",
          text: "The most likely pain points — and the trap of assuming them without validation",
        },
        {
          type: "paragraph",
          text: "In this type of organization, the same symptoms tend to show up: information scattered across departments, emails, and sites; excessive dependency on a handful of key people's knowledge; disproportionate time spent consolidating reports, minutes, and presentations; inconsistent response quality to end users; and operational overload from repetitive search, summarization, and drafting tasks.",
        },
        {
          type: "paragraph",
          text: "It's tempting to treat these pain points as an already-completed diagnosis. They're not — they're reasonable hypotheses that must be formally validated at the start of any project, not assumptions a full roadmap gets built on.",
        },
        {
          type: "heading",
          text: "Governance before pilots",
        },
        {
          type: "paragraph",
          text: "Order matters more than it seems. Before launching any AI pilot, an organization needs to resolve, in sequence: governance (clear ownership, a usage policy, a committee combining business, IT, security, and data), security (conditional access, review of inherited permissions, least-privilege principle), and data quality (classification, cleanup of critical repositories, prioritized content). Only after that does it make sense to talk about a pilot and, later, adoption at scale.",
        },
        {
          type: "paragraph",
          text: "Skipping this order — starting by buying licenses and figuring out security \"later\" — is the most common way to turn a real opportunity into a reputational risk.",
        },
        {
          type: "heading",
          text: "The real risk isn't AI itself",
        },
        {
          type: "paragraph",
          text: "It's worth saying clearly: generative AI doesn't create new permissions. It accelerates access to what was already there. The main risk is almost never the technology — it's overexposed, poorly classified, or poorly governed content that this technology can now find and use far faster than a person could.",
        },
        {
          type: "paragraph",
          text: "That's why the best AI adoption doesn't start by buying licenses. It starts by reducing overexposure risk and gaining real visibility into where sensitive data lives.",
        },
        {
          type: "heading",
          text: "Scaling with evidence, not enthusiasm",
        },
        {
          type: "paragraph",
          text: "A responsible roadmap usually looks like this: a few weeks of preparation (governance, permissions, data), followed by a two-to-three-month pilot with measurable, business-visible use cases, then a controlled scaling phase backed by real evidence of value, and finally an ongoing optimization stage.",
        },
        {
          type: "paragraph",
          text: "The metrics that matter aren't the ones that generate internal excitement, but the ones that demonstrate business value: time saved on drafting and search, real reduction in response times, adoption levels by department, and the absence of security or compliance incidents tied to the use of these tools.",
        },
        {
          type: "heading",
          text: "The decision that actually matters",
        },
        {
          type: "paragraph",
          text: "An organization's best first decision when facing AI isn't buying several tools at once, hoping one of them works. It's choosing a governable platform that fits the conditions it already has, demonstrating value quickly with concrete cases, and scaling only when evidence — not enthusiasm — supports it.",
        },
      ],
    },
  },
  {
    id: "corporate-brain-sharepoint-copilot",
    slug: {
      es: "corporate-brain-sharepoint-copilot",
      en: "corporate-brain-sharepoint-copilot",
    },
    date: "2026-08-07",
    author: "Marketing Kempro",
    title: {
      es: "Cómo construimos un \"Corporate Brain\" con SharePoint y Copilot Chat, sin licencias adicionales",
      en: "How we built a \"Corporate Brain\" with SharePoint and Copilot Chat, with no additional licenses",
    },
    excerpt: {
      es: "Antes de la IA, la arquitectura de información y la seguridad documental. Un caso real de cómo estructurar SharePoint hizo posible un asistente conversacional sin licencias adicionales.",
      en: "Before AI comes information architecture and document security. A real case of how structuring SharePoint made a conversational assistant possible without additional licenses.",
    },
    category: { es: "Tecnología", en: "Technology" },
    categoryKey: "tecnologia",
    readingTime: { es: "6 min de lectura", en: "6 min read" },
    content: {
      es: [
        {
          type: "paragraph",
          text: "En un artículo anterior hablamos de un principio que repetimos con frecuencia: el gobierno y la organización de la información deben resolverse antes de poner una capa de inteligencia artificial encima. Este proyecto es un ejemplo concreto de esa idea llevada a la práctica, con una empresa cliente de operación multirregional.",
        },
        {
          type: "heading",
          text: "Primero, el sitio: un hub de comunicación moderno",
        },
        {
          type: "paragraph",
          text: "El punto de partida no fue la IA. Fue construir, sobre SharePoint, un sitio moderno de comunicación corporativa que funcionara como concentrador real de información, no como otro repositorio más donde los documentos van a perderse.",
        },
        {
          type: "paragraph",
          text: "La arquitectura se definió en dos niveles: un espacio corporativo, con acceso abierto a toda la organización, para políticas, procesos y comunicaciones que aplican a todos; y espacios por región o país, donde cada operación local gestiona su propia información sin exponerla innecesariamente al resto de la compañía.",
        },
        {
          type: "paragraph",
          text: "Ese segundo nivel es el que más se suele subestimar. La seguridad de SharePoint permite definir permisos desde el sitio completo hasta el documento individual, y aprovechar esa granularidad fue lo que hizo posible tener un solo ecosistema de información con múltiples niveles de confidencialidad conviviendo de forma ordenada, en vez de decenas de sitios aislados sin relación entre sí.",
        },
        {
          type: "heading",
          text: "Solo después, la capa de inteligencia",
        },
        {
          type: "paragraph",
          text: "Una vez resuelta la seguridad y la organización documental, es decir, una vez que cada documento vivía en el lugar correcto, con los permisos correctos, y con una estructura de información coherente — recién ahí tuvo sentido agregar Copilot Chat sobre ese ecosistema.",
        },
        {
          type: "paragraph",
          text: "El orden no es un detalle menor. Copilot Chat no organiza el conocimiento de una empresa; responde preguntas basándose en el conocimiento que ya está bien organizado y correctamente gobernado. Si se agrega esa capa de IA sobre una estructura documental caótica o mal autorizada, lo único que se logra es encontrar el desorden más rápido, no resolverlo.",
        },
        {
          type: "paragraph",
          text: "Con la base ya sólida, Copilot Chat se convirtió en lo que llamamos el \"Corporate Brain\": un punto de acceso conversacional donde cualquier persona autorizada puede preguntar por una política, un proceso o una norma corporativa, y recibir una respuesta construida sobre el contenido real de la organización, respetando exactamente los mismos permisos que ya existían en SharePoint.",
        },
        {
          type: "heading",
          text: "Por qué este enfoque cambia la conversación sobre adopción de IA",
        },
        {
          type: "paragraph",
          text: "El resultado no fue solo una herramienta de búsqueda más rápida. Fue una forma distinta de distribuir el conocimiento dentro de la empresa: se masifica (cualquier persona autorizada accede sin depender de preguntarle a alguien más), se unifica (una sola fuente de verdad en vez de versiones dispersas en correos y carpetas personales), y se vuelve omnicanal (la misma base de conocimiento puede alimentar consultas desde Teams, desde el navegador o desde flujos automatizados).",
        },
        {
          type: "paragraph",
          text: "Y quizás lo más relevante para cualquier comité que esté evaluando esta inversión: no requirió licencias adicionales. Copilot Chat viene incluido dentro de los planes comerciales de Microsoft 365 que la mayoría de las organizaciones medianas y grandes ya tienen contratados. La inversión real no estuvo en comprar una nueva plataforma de IA — estuvo en el trabajo, muchas veces invisible, de definir bien la arquitectura de información y la seguridad documental.",
        },
        {
          type: "paragraph",
          text: "Es la misma lección de siempre, ahora con evidencia de un caso real: la IA no reemplaza el trabajo de organizar el conocimiento de una empresa. Lo hace visible y accesible, pero solo si ese trabajo ya se hizo bien.",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "In a previous article, we talked about a principle we repeat often: governance and information organization must be resolved before adding a layer of AI on top. This project is a concrete example of that idea in practice, with a client organization operating across multiple regions.",
        },
        {
          type: "heading",
          text: "First, the site: a modern communication hub",
        },
        {
          type: "paragraph",
          text: "The starting point wasn't AI. It was building, on SharePoint, a modern corporate communication site that worked as a real information hub, not just another repository where documents go to get lost.",
        },
        {
          type: "paragraph",
          text: "The architecture was defined at two levels: a corporate space, openly accessible to the whole organization, for policies, processes, and communications that apply to everyone; and region or country-level spaces, where each local operation manages its own information without unnecessarily exposing it to the rest of the company.",
        },
        {
          type: "paragraph",
          text: "That second level is the one most often underestimated. SharePoint's security model allows permissions to be defined from the entire site down to the individual document, and taking advantage of that granularity is what made it possible to have a single information ecosystem with multiple confidentiality levels coexisting in an orderly way, instead of dozens of isolated sites with no relationship to each other.",
        },
        {
          type: "heading",
          text: "Only afterward, the intelligence layer",
        },
        {
          type: "paragraph",
          text: "Once security and document organization were resolved — meaning every document lived in the right place, with the right permissions, within a coherent information structure — only then did it make sense to add Copilot Chat on top of that ecosystem.",
        },
        {
          type: "paragraph",
          text: "The order isn't a minor detail. Copilot Chat doesn't organize a company's knowledge; it answers questions based on knowledge that is already well organized and properly governed. Adding that AI layer on top of a chaotic or poorly-permissioned document structure only helps you find the mess faster — it doesn't solve it.",
        },
        {
          type: "paragraph",
          text: "With a solid foundation already in place, Copilot Chat became what we call the \"Corporate Brain\": a conversational access point where any authorized person can ask about a policy, a process, or a corporate standard, and get an answer built on the organization's actual content, respecting the exact same permissions already defined in SharePoint.",
        },
        {
          type: "heading",
          text: "Why this approach changes the conversation about AI adoption",
        },
        {
          type: "paragraph",
          text: "The result wasn't just a faster search tool. It was a different way of distributing knowledge across the company: it becomes massified (any authorized person can access it without depending on asking someone else), unified (a single source of truth instead of scattered versions in emails and personal folders), and omnichannel (the same knowledge base can power queries from Teams, from the browser, or from automated workflows).",
        },
        {
          type: "paragraph",
          text: "And perhaps most relevant for any committee evaluating this kind of investment: it required no additional licenses. Copilot Chat is included within the Microsoft 365 commercial plans that most mid-size and large organizations already have. The real investment wasn't in buying a new AI platform — it was in the often-invisible work of properly defining information architecture and document-level security.",
        },
        {
          type: "paragraph",
          text: "It's the same lesson as always, now backed by a real case: AI doesn't replace the work of organizing a company's knowledge. It makes that knowledge visible and accessible — but only if that work was already done well.",
        },
      ],
    },
  },
  {
    id: "sitio-web-kempro-con-ia",
    slug: {
      es: "como-construimos-el-sitio-web-de-kempro-con-ia",
      en: "how-we-built-the-kempro-website-with-ai",
    },
    date: "2026-05-05",
    author: "Marketing Kempro",
    title: {
      es: "Cómo construimos el sitio web de Kempro 100% con IA",
      en: "How we built the Kempro website 100% with AI",
    },
    excerpt: {
      es: "Nuestro propio sitio es el primer caso de uso que documentamos: diseño, contenido y desarrollo construidos íntegramente con herramientas de inteligencia artificial, de principio a fin.",
      en: "Our own website is the first use case we're documenting: design, content, and development built entirely with AI tools, from start to finish.",
    },
    category: { es: "Tecnología", en: "Technology" },
    categoryKey: "tecnologia",
    readingTime: { es: "6 min de lectura", en: "6 min read" },
    content: {
      es: [
        {
          type: "paragraph",
          text: "Aconsejamos a nuestros clientes sobre cómo adoptar inteligencia artificial de forma seria, gobernada y con resultados medibles. Nos pareció natural aplicarnos ese mismo estándar antes de pedírselo a nadie más: el sitio web que estás leyendo ahora mismo se diseñó, redactó y desarrolló por completo con herramientas de IA, sin una sola línea de código ni un párrafo de contenido escrito manualmente desde cero.",
        },
        {
          type: "paragraph",
          text: "No lo hicimos como ejercicio de marketing. Lo hicimos porque queríamos entender, en carne propia, dónde una IA realmente acelera el trabajo y dónde sigue necesitando criterio humano — la misma pregunta que le hacemos a cada empresa que nos consulta.",
        },
        {
          type: "heading",
          text: "El proceso, no solo el resultado",
        },
        {
          type: "paragraph",
          text: "Empezamos por el diseño. En lugar de partir de una plantilla genérica, tomamos referencias visuales reales — capturas de pantalla, sitios de la industria, mockups en Figma — y las convertimos en instrucciones precisas para la IA: medidas exactas, tipografía, espaciados, paleta de colores propia de Kempro. El objetivo nunca fue \"que se vea bonito\" en abstracto, sino replicar con fidelidad milimétrica una referencia y adaptarla a nuestra propia identidad de marca.",
        },
        {
          type: "heading",
          text: "De la maqueta al código, sin fricción",
        },
        {
          type: "paragraph",
          text: "Cada sección del sitio, el header, las tarjetas de artículos, los formularios y el selector de idioma, se construyó como un componente reutilizable, revisado y ajustado en varias iteraciones. La IA no escribió el sitio de una sola vez: lo construyó igual que lo haría un equipo humano, en ciclos cortos de propuesta, revisión visual en un navegador real y corrección.",
        },
        {
          type: "list",
          items: [
            "Un sistema de diseño con tokens de color, tipografía y espaciado, en vez de estilos sueltos repetidos en cada página",
            "Verificación visual en navegador después de cada cambio, no solo revisión de código",
            "Contenido en español e inglés validado en tiempo de construcción, para que ningún enlace quede roto en un idioma",
            "Componentes reutilizados entre secciones en vez de duplicar lógica",
          ],
        },
        {
          type: "heading",
          text: "Contenido bilingüe sin atajos",
        },
        {
          type: "paragraph",
          text: "Este mismo artículo, y cada artículo del blog, existe en español e inglés desde el momento en que se crea, con una validación automática que impide publicar una versión sin su equivalente en el otro idioma.",
        },
        {
          type: "paragraph",
          text: "No es un detalle menor: muchos sitios bilingües fallan justamente ahí, con enlaces que cambian de idioma pero te dejan en una página que no existe.",
        },
        {
          type: "heading",
          text: "Lo que aprendimos",
        },
        {
          type: "paragraph",
          text: "La IA no reemplazó el criterio de diseño, ni la decisión de qué contenido merece existir, ni la revisión final de cada detalle. Lo que sí cambió radicalmente fue la velocidad: iteraciones que antes tomaban días de ida y vuelta entre diseño y desarrollo ahora se resuelven en minutos, sin sacrificar la fidelidad al detalle.",
        },
        {
          type: "paragraph",
          text: "Es la misma conclusión a la que llegamos una y otra vez con nuestros clientes: la inteligencia artificial no sustituye el trabajo de pensar bien un problema. Lo acelera, siempre que exista una estructura clara — de diseño, de contenido, de gobierno — sobre la cual pueda operar.",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "We advise our clients on how to adopt artificial intelligence seriously, with governance and measurable results. It felt natural to hold ourselves to that same standard before asking it of anyone else: the website you're reading right now was designed, written, and built entirely with AI tools, without a single line of code or paragraph of content written manually from scratch.",
        },
        {
          type: "paragraph",
          text: "We didn't do this as a marketing exercise. We did it because we wanted to understand, firsthand, where AI genuinely speeds up the work and where it still needs human judgment.",
        },
        {
          type: "heading",
          text: "The process, not just the result",
        },
        {
          type: "paragraph",
          text: "We started with design. Instead of starting from a generic template, we took real visual references — screenshots, industry sites, Figma mockups — and turned them into precise instructions for the AI: exact measurements, typography, spacing, Kempro's own color palette. The goal was never to \"look nice\" in the abstract, but to replicate a reference with pixel-level fidelity and adapt it to our own brand identity.",
        },
        {
          type: "heading",
          text: "From mockup to code, without friction",
        },
        {
          type: "paragraph",
          text: "Every section of the site, the header, article cards, forms, the language switcher — was built as a reusable component, reviewed and refined across several iterations. The AI didn't write the site in one shot: it built it the way a human team would, in short cycles of proposals, visual review in a real browser, and correction.",
        },
        {
          type: "list",
          items: [
            "A design system with color, typography, and spacing tokens, instead of loose styles repeated on every page",
            "Visual verification in a real browser after every change, not just code review",
            "Spanish and English content validated at build time, so no link ever breaks in either language",
            "Components reused across sections instead of duplicating logic",
          ],
        },
        {
          type: "heading",
          text: "Bilingual content, no shortcuts",
        },
        {
          type: "paragraph",
          text: "This very article, and every article on the blog, exists in Spanish and English from the moment it's created, with an automatic check that blocks publishing a version without its counterpart in the other language.",
        },
        {
          type: "paragraph",
          text: "That's not a minor detail — many bilingual sites fail exactly there, with language links that leave you on a page that doesn't exist.",
        },
        {
          type: "heading",
          text: "What we learned",
        },
        {
          type: "paragraph",
          text: "AI didn't replace design judgment, the decision of what content deserves to exist, or the final review of every detail. What changed radically was speed: iterations that used to take days of back-and-forth between design and development now get resolved in minutes, without sacrificing fidelity to detail.",
        },
        {
          type: "paragraph",
          text: "It's the same conclusion we keep reaching with our clients: artificial intelligence doesn't replace the work of thinking a problem through properly. It accelerates it — as long as there's a clear structure in place, whether in design, content, or governance, for it to operate on.",
        },
      ],
    },
  },
  {
    id: "sitio-kempro-con-claude",
    slug: {
      es: "como-construimos-el-sitio-de-kempro-usando-claude",
      en: "how-we-built-the-kempro-website-using-claude",
    },
    date: "2026-08-26",
    author: "Marketing Kempro",
    title: {
      es: "Cómo construimos el sitio de Kempro usando Claude",
      en: "How we built the Kempro website using Claude",
    },
    excerpt: {
      es: "Contamos, paso a paso, cómo diseñamos y construimos este mismo sitio trabajando con Claude: las herramientas que usamos, las decisiones que tomamos y lo que aprendimos en el camino.",
      en: "A step-by-step look at how we designed and built this very website working with Claude: the tools we used, the decisions we made, and what we learned along the way.",
    },
    category: { es: "Tecnología", en: "Technology" },
    categoryKey: "tecnologia",
    readingTime: { es: "6 min de lectura", en: "6 min read" },
    content: {
      es: [
        {
          type: "paragraph",
          text: "Este sitio que estás viendo no lo construimos solos: lo hicimos trabajando codo a codo con Claude, el asistente de IA de Anthropic. Queremos contarte cómo fue el proceso, qué herramientas usamos y qué aprendimos, por si estás pensando en hacer algo parecido en tu propia empresa.",
        },
        {
          type: "heading",
          text: "Las herramientas del proceso",
        },
        {
          type: "paragraph",
          text: "No usamos una sola herramienta de IA, sino una combinación de piezas, cada una con un rol distinto:",
        },
        {
          type: "list",
          items: [
            "Figma — el programa donde definimos primero cómo se vería cada página: colores, tipografía y espacios, antes de escribir una sola línea de código.",
            "Cowork — el espacio donde definimos el diseño y el contenido junto con Claude, revisamos el sitio página por página y preparamos instrucciones precisas para construir cada cambio.",
            "Claude Code — el asistente que escribe y modifica el código real del sitio directamente en la terminal, a partir de esas instrucciones en lenguaje natural.",
            "Envato Elements — un banco de video y fotografía de stock donde buscamos piezas visuales que encajaran con la paleta de colores de la marca.",
            "Sanity — el sistema con el que estamos definiendo cómo el equipo podrá editar el contenido del sitio en el futuro sin tocar código.",
            "Vercel — la plataforma donde el sitio queda publicado y disponible en internet.",
          ],
        },
        {
          type: "heading",
          text: "Cómo fue el proceso, paso a paso",
        },
        {
          type: "paragraph",
          text: "Primero definimos la estructura y el contenido real del sitio — qué servicios ofrecemos, qué casos de éxito contar, qué dice \"Sobre nosotros\" — antes de pensar en cómo se vería visualmente. Escribir el contenido real primero, en vez de usar textos de relleno, nos ahorró tener que rehacer diseño más adelante.",
        },
        {
          type: "paragraph",
          text: "Con esa base, construimos cada página con Claude Code a partir de instrucciones puntuales: qué bloque agregar, qué texto usar, qué comportamiento debía tener. Cada cambio se revisaba antes de aplicarse, así que el proceso fue más una conversación en pasos pequeños que una sola instrucción gigante.",
        },
        {
          type: "paragraph",
          text: "Después ajustamos el detalle visual: colores, tipografía y márgenes, hasta que cada bloque se sintiera parte del mismo sitio y no una pieza pegada por separado.",
        },
        {
          type: "paragraph",
          text: "Al final hicimos una revisión completa del sitio, página por página, buscando inconsistencias — un botón con otro estilo, un margen distinto, un enlace que llevaba al lugar equivocado en el otro idioma — cosas normales cuando distintas partes de un sitio se construyen en momentos diferentes.",
        },
        {
          type: "heading",
          text: "Lo que aprendimos",
        },
        {
          type: "paragraph",
          text: "La mayor ventaja no fue la velocidad, aunque también la hubo: fue poder iterar en voz alta. Cada decisión de diseño se podía probar, ver y corregir en minutos en vez de días, lo que nos permitió equivocarnos rápido y barato antes de dar algo por terminado.",
        },
        {
          type: "paragraph",
          text: "Esto es solo un resumen. En las próximas semanas vamos a publicar un artículo más detallado, decisión por decisión — desde por qué elegimos cada color hasta cómo resolvimos que el sitio funcionara igual de bien en español y en inglés.",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "The website you're looking at wasn't built alone — we made it working side by side with Claude, Anthropic's AI assistant. We want to share how the process went, which tools we used, and what we learned, in case you're thinking about doing something similar at your own company.",
        },
        {
          type: "heading",
          text: "The tools behind the process",
        },
        {
          type: "paragraph",
          text: "We didn't rely on a single AI tool — it was a combination of pieces, each with its own role:",
        },
        {
          type: "list",
          items: [
            "Figma — the design tool where we first defined how each page would look: colors, typography, and spacing, before writing a single line of code.",
            "Cowork — the space where we defined design and content together with Claude, reviewed the site page by page, and prepared precise instructions for building each change.",
            "Claude Code — the assistant that writes and edits the site's actual code directly in the terminal, based on those natural-language instructions.",
            "Envato Elements — a stock video and photography library where we sourced visual pieces that matched the brand's color palette.",
            "Sanity — the system we're setting up so the team can edit the site's content in the future without touching code.",
            "Vercel — the platform where the site is published and made available on the internet.",
          ],
        },
        {
          type: "heading",
          text: "The process, step by step",
        },
        {
          type: "paragraph",
          text: "We started by defining the site's real structure and content — what services we offer, which case studies to tell, what \"About us\" should say — before thinking about how it would look. Writing the real content first, instead of using placeholder text, saved us from redoing design work later.",
        },
        {
          type: "paragraph",
          text: "With that foundation in place, we built each page with Claude Code from specific instructions: which block to add, what text to use, how it should behave. Every change was reviewed before being applied, so the process felt more like a conversation in small steps than one giant instruction.",
        },
        {
          type: "paragraph",
          text: "After that, we fine-tuned the visual details: colors, typography, and spacing, until every block felt like part of the same site instead of a piece bolted on separately.",
        },
        {
          type: "paragraph",
          text: "At the end, we did a full review of the site, page by page, looking for inconsistencies — a button with a different style, a mismatched margin, a link pointing to the wrong place in the other language — the kind of thing that naturally happens when different parts of a site get built at different times.",
        },
        {
          type: "heading",
          text: "What we learned",
        },
        {
          type: "paragraph",
          text: "The biggest advantage wasn't speed, though there was plenty of that too — it was being able to iterate out loud. Every design decision could be tested, seen, and corrected in minutes instead of days, which let us get things wrong quickly and cheaply before calling anything final.",
        },
        {
          type: "paragraph",
          text: "This is just a summary. In the coming weeks we'll publish a more detailed article, decision by decision — from why we chose each color to how we made sure the site worked equally well in Spanish and English.",
        },
      ],
    },
  },
  {
    id: "ecosistema-digital-caja-compensacion",
    slug: {
      es: "ecosistema-digital-completo-a-mano",
      en: "a-full-digital-ecosystem-built-by-hand",
    },
    date: "2026-08-20",
    author: "Marketing Kempro",
    title: {
      es: "Un ecosistema digital completo, a mano: lo que la IA nos habría ahorrado",
      en: "A full digital ecosystem, built by hand: what AI would have saved us",
    },
    excerpt: {
      es: "Repasamos un proyecto real — definir el ecosistema digital completo de una caja de compensación colombiana — y comparamos el esfuerzo manual que tomó entonces con los pasos que hoy resolveríamos con IA.",
      en: "We look back at a real project, mapping the complete digital ecosystem for a Colombian compensation fund, and compare the manual effort it took then with the steps we'd solve with AI today.",
    },
    category: { es: "Automatización", en: "Automation" },
    categoryKey: "automatizacion",
    readingTime: { es: "7 min de lectura", en: "7 min read" },
    content: {
      es: [
        {
          type: "paragraph",
          text: "Hace un tiempo trabajamos con una caja de compensación colombiana en un proyecto de alcance amplio: definir su ecosistema digital completo. No era solo \"hacer un sitio web\" — era auditar, ordenar y conectar todo lo que la organización ya tenía, para que funcionara como un solo sistema coherente en vez de piezas sueltas.",
        },
        {
          type: "heading",
          text: "El reto real",
        },
        {
          type: "paragraph",
          text: "Llegar ahí significó trabajar varios frentes a la vez:",
        },
        {
          type: "list",
          items: [
            "Verificar que la información estuviera completa y al alcance del usuario, sin fraccionarse entre páginas o sistemas.",
            "Aplicar buenas prácticas de UX a cada flujo del sitio.",
            "Parametrizar Google Tag Manager para que cada interacción quedara correctamente medida.",
            "Analizar el comportamiento real de los usuarios en Google Analytics.",
            "Hacer un análisis SEO completo del sitio.",
            "Definir el diseño gráfico de cada sección.",
            "Diseñar una estructura organizacional que permitiera que la información y la comunicación fluyeran, para que el sitio pudiera mantenerse actualizado en el tiempo.",
          ],
        },
        {
          type: "paragraph",
          text: "Cada uno de estos frentes, por separado, toma tiempo. Hacerlos todos a la vez, a mano, verificando manualmente cada página y cada flujo, fue un esfuerzo considerable — semanas de trabajo cruzando información de distintas fuentes antes de poder tomar la primera decisión de diseño.",
        },
        {
          type: "heading",
          text: "Qué habríamos hecho distinto con IA",
        },
        {
          type: "paragraph",
          text: "Si hoy tuviéramos que repetir ese mismo proyecto, con las herramientas de IA que ya usamos, definiríamos estos pasos:",
        },
        {
          type: "list",
          items: [
            "Auditoría de contenido asistida: en vez de revisar página por página a mano, usar IA para rastrear todo el sitio y señalar en minutos qué información está incompleta, duplicada o fraccionada entre secciones.",
            "Diagnóstico UX acelerado: analizar los flujos existentes con IA para detectar fricciones y comparar contra buenas prácticas, en lugar de un análisis manual heurístico que toma días por flujo.",
            "Parametrización de Google Tag Manager guiada: usar IA para generar y validar la estructura de etiquetas y eventos a partir del mapa de páginas, reduciendo el ida y vuelta manual entre marketing y desarrollo.",
            "Lectura de Google Analytics en lenguaje natural: pedirle a la IA que resuma los patrones de comportamiento relevantes, en vez de cruzar reportes manualmente.",
            "Análisis SEO automatizado: escanear el sitio completo para detectar problemas técnicos y de contenido en minutos, priorizados por impacto.",
            "Primeras propuestas de diseño gráfico generadas con IA como punto de partida, para acelerar la primera ronda de revisión con el cliente.",
            "Documentar la estructura organizacional recomendada con ayuda de IA, a partir de cómo fluía realmente la información dentro de la empresa.",
          ],
        },
        {
          type: "heading",
          text: "El esfuerzo que nos habríamos ahorrado",
        },
        {
          type: "paragraph",
          text: "No se trata de reemplazar el criterio humano — cada una de estas decisiones sigue necesitando revisión y ajuste por el equipo. La diferencia está en dónde se invierte el tiempo: en vez de gastarlo en juntar y verificar información dispersa, ese tiempo se dedica a decidir con esa información ya lista.",
        },
        {
          type: "paragraph",
          text: "Ese es, en el fondo, el mismo principio detrás de cada proyecto de Kempro: la IA no sustituye el diagnóstico, lo acelera, para que el equipo llegue más rápido al punto donde su criterio realmente importa.",
        },
      ],
      en: [
        {
          type: "paragraph",
          text: "Some time ago we worked with a Colombian compensation fund (\"caja de compensación\") on a broad-scope project: defining its entire digital ecosystem. It wasn't just \"build a website\" — it meant auditing, organizing, and connecting everything the organization already had, so it worked as one coherent system instead of scattered pieces.",
        },
        {
          type: "heading",
          text: "The real challenge",
        },
        {
          type: "paragraph",
          text: "Getting there meant working across several fronts at once:",
        },
        {
          type: "list",
          items: [
            "Verifying that information was complete and accessible to users, without being split across pages or systems.",
            "Applying UX best practices to every flow on the site.",
            "Configuring Google Tag Manager so every interaction was correctly tracked.",
            "Analyzing real user behavior in Google Analytics.",
            "Running a full SEO audit of the site.",
            "Defining the graphic design for every section.",
            "Designing an organizational structure that let information and communication flow, so the site could stay updated over time.",
          ],
        },
        {
          type: "paragraph",
          text: "Each of these fronts takes time on its own. Doing all of them at once, by hand, manually checking every page and every flow, was a considerable effort — weeks of work cross-referencing information from different sources before we could make the first design decision.",
        },
        {
          type: "heading",
          text: "What we would have done differently with AI",
        },
        {
          type: "paragraph",
          text: "If we had to run that same project today, with the AI tools we already use, we'd define these steps:",
        },
        {
          type: "list",
          items: [
            "AI-assisted content audit: instead of reviewing page by page by hand, use AI to scan the whole site and flag in minutes what information is incomplete, duplicated, or fragmented across sections.",
            "Faster UX diagnostics: analyze existing flows with AI to spot friction points and compare them against best practices, instead of a manual heuristic review that takes days per flow.",
            "Guided Google Tag Manager setup: use AI to generate and validate the tag and event structure from the site map, cutting down the manual back-and-forth between marketing and development.",
            "Google Analytics read in plain language: ask AI to summarize the relevant behavior patterns instead of cross-referencing reports by hand.",
            "Automated SEO analysis: scan the entire site to catch technical and content issues in minutes, prioritized by impact.",
            "First-draft graphic design concepts generated with AI as a starting point, to speed up the first review round with the client.",
            "Document the recommended organizational structure with AI's help, based on how information actually flowed inside the company.",
          ],
        },
        {
          type: "heading",
          text: "The effort we would have saved",
        },
        {
          type: "paragraph",
          text: "This isn't about replacing human judgment — every one of these decisions still needs the team's review and adjustment. The difference is where the time goes: instead of spending it gathering and verifying scattered information, that time goes into deciding once the information is already in place.",
        },
        {
          type: "paragraph",
          text: "That's, at its core, the same principle behind every Kempro project: AI doesn't replace the diagnostic — it speeds it up, so the team gets to the point where its judgment actually matters, faster.",
        },
      ],
    },
  },
];

// Every post must define a slug for every supported locale (see the
// "Convenciones de contenido bilingüe" section in CLAUDE.md) — the locale
// switcher relies on this relation to resolve the equivalent slug when
// changing language. Catch a missing translation at build time rather than
// producing a broken link or a silent 404 in production.
for (const post of data) {
  for (const locale of routing.locales) {
    if (!post.slug[locale]) {
      throw new Error(
        `[lib/data/blog.ts] Post "${post.id}" is missing a "${locale}" slug. Every post must define a slug for every locale — see "Convenciones de contenido bilingüe" in CLAUDE.md.`,
      );
    }
  }
}

export function getBlogPosts(locale: Locale): BlogPost[] {
  return data
    .map((p) => {
      const author = resolveAuthor(locale, p.author);
      return {
        id: p.id,
        slug: p.slug[locale],
        date: p.date,
        author: p.author,
        authorRole: author.role,
        authorInitials: author.initials,
        title: p.title[locale],
        excerpt: p.excerpt[locale],
        category: p.category[locale],
        categoryKey: p.categoryKey,
        readingTime: p.readingTime[locale],
        content: p.content[locale],
        coverImage: p.coverImage,
      };
    })
    .sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1));
}

export function getBlogPost(locale: Locale, slug: string): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}
