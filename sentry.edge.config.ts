// Sentry init for code running in the Edge runtime (proxy.ts's next-intl
// middleware runs here). Imported conditionally from instrumentation.ts.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});
