// Sentry init for server-side code (Route Handlers, Server Components,
// Server Actions running in the Node.js runtime). Imported conditionally
// from instrumentation.ts's register() — see that file for why.
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Error tracking only, per the perf-cost discussion: no request tracing
  // sampled here. Skipped entirely (SDK becomes a no-op) if the DSN isn't
  // configured, so local dev / preview builds without it keep working.
  tracesSampleRate: 0,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});
