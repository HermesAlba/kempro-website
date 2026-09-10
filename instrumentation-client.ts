// Sentry init for the browser. Next.js auto-loads this file (the
// "instrumentation-client" convention) before any client code runs, so
// it captures errors from the very first paint onward — no manual
// <Script> tag needed.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Deliberately error-tracking-only (see the "does Sentry slow the site
  // down" discussion): tracesSampleRate 0 disables performance tracing,
  // and Session Replay is never enabled (no replayIntegration() below) —
  // both are the parts of Sentry that actually add meaningful overhead.
  // Skipped entirely if the DSN isn't configured, so local dev keeps
  // working without one.
  tracesSampleRate: 0,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});
