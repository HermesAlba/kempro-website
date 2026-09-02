import type { Locale } from "@/i18n/routing";

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
};

// Placeholder team members (María Fernanda Ríos, Santiago Londoño, Camila
// Torres, Andrés Gómez) were removed — they weren't real people and were
// never actually rendered anywhere on the site (the TeamGrid component that
// reads this data isn't used on any page). Add real team members here when
// available.
const data: {
  name: string;
  role: Record<Locale, string>;
  initials: string;
}[] = [];

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
