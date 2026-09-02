import type { Locale } from "@/i18n/routing";

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
};

const data: {
  name: string;
  role: Record<Locale, string>;
  initials: string;
}[] = [
  {
    name: "María Fernanda Ríos",
    role: { es: "CEO y Fundadora", en: "CEO & Founder" },
    initials: "MR",
  },
  {
    name: "Santiago Londoño",
    role: { es: "Head of AI Engineering", en: "Head of AI Engineering" },
    initials: "SL",
  },
  {
    name: "Camila Torres",
    role: { es: "Lead AI Strategist", en: "Lead AI Strategist" },
    initials: "CT",
  },
  {
    name: "Andrés Gómez",
    role: { es: "Head of Client Solutions", en: "Head of Client Solutions" },
    initials: "AG",
  },
];

export function getTeam(locale: Locale): TeamMember[] {
  return data.map((m) => ({
    name: m.name,
    role: m.role[locale],
    initials: m.initials,
  }));
}

// Exposes the raw bilingual records (both locales in one object per member)
// — used only by the one-off Sanity migration script
// (scripts/migrate-to-sanity.ts). Not used anywhere in the app itself.
export function getTeamRaw() {
  return data;
}
