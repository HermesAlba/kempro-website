"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Next.js's special top-level error boundary: only triggers when an error
// escapes even the root layout itself (app/[locale]/layout.tsx), which a
// normal per-route error.tsx can't catch. Because it replaces the root
// layout entirely when active, it must render its own <html>/<body> — it
// can't rely on next-intl's provider (which lives inside the layout this
// file is standing in for), so this stays deliberately unlocalized/plain
// rather than risk a second crash while trying to render a fancier page.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Algo salió mal</h1>
        <p style={{ marginTop: "0.75rem", color: "#525252" }}>
          Ya nos enteramos del problema. Intenta recargar la página.
        </p>
      </body>
    </html>
  );
}
