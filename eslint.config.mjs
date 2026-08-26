import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored, unmodified third-party script (Stripe's mesh-gradient —
    // see components/sections/hero-gradient.tsx) — not held to our own
    // lint rules since we don't hand-edit its source.
    "lib/Gradient.js",
  ]),
]);

export default eslintConfig;
