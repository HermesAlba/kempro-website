import * as Sentry from "@sentry/nextjs";

// Next.js instrumentation hook: register() runs once per server/edge
// runtime instance at boot, before any request is handled. Loads the
// right Sentry init file for whichever runtime actually started (a
// single Next.js app can boot both — Node.js for most routes/Server
// Components, Edge for proxy.ts's next-intl middleware).
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

// Reports errors thrown by Server Components / Route Handlers / Server
// Actions that Next.js's own error handling swallows before a normal
// error.tsx boundary would see them (e.g. errors during the server render
// pass itself, not just ones a client component throws afterward).
export const onRequestError = Sentry.captureRequestError;
