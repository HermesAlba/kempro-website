import Link from "next/link";
import { workSans } from "@/lib/fonts";
import "./globals.css";

export default function RootNotFound() {
  return (
    <html lang="es" className={workSans.variable}>
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-work-sans), system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>404</h1>
        <p style={{ marginTop: "0.5rem", color: "#475569" }}>
          Page not found · Página no encontrada
        </p>
        <Link
          href="/es"
          style={{
            marginTop: "1.5rem",
            color: "var(--color-primary-600)",
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          Volver al inicio · Back home
        </Link>
      </body>
    </html>
  );
}
