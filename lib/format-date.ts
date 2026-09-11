// Formats a date-only string (e.g. "2026-08-26", no time component) for
// display, consistently, regardless of where it runs.
//
// The bug this avoids: `new Date("2026-08-26")` parses as UTC midnight.
// `.toLocaleDateString()` without an explicit `timeZone` formats using the
// *runtime's local timezone* — on the server (Vercel, UTC) that's still
// "26 ago 2026", but in a visitor's browser west of UTC (all of Latin
// America, including Colombia) UTC midnight is still the *previous*
// evening locally, so the client renders "25 ago 2026" instead. For a
// component that runs on both the server (SSR) and the client (hydration),
// that mismatch is exactly the kind of server/client text difference that
// makes React discard and re-render the surrounding tree on hydration
// (visible as the minified "Error #418" in prod) — which, as a side
// effect, was also causing the sitewide Organization/WebSite JSON-LD
// script in app/[locale]/layout.tsx to render twice on the home page. Pin
// formatting to UTC everywhere so the server and every visitor's browser,
// no matter their own timezone, compute the exact same calendar day.
export function formatDisplayDate(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
