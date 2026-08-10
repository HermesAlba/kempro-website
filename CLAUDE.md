@AGENTS.md

## Convenciones de contenido bilingüe

Cualquier contenido con slug localizado (artículos de blog, servicios, casos de éxito, o cualquier página futura con URL distinta por idioma) debe seguir estas reglas:

1. **Slug vinculado, no separado.** El slug en español y en inglés se define dentro de la misma entrada de datos (por ejemplo `slug: { es: "...", en: "..." }`), nunca como registros independientes sin relación entre sí. Ver `lib/data/blog.ts` (campo `id` estable + `slug: Record<Locale, string>`) como referencia.
2. **El selector de idioma nunca debe limitarse a cambiar el prefijo de locale en la URL.** Para rutas con slug localizado, debe resolver el slug equivalente en el idioma de destino usando esa relación de datos (no reenviar el slug de origen tal cual). Ver `components/layout/locale-switcher.tsx` como implementación de referencia — ahí se resuelve el artículo equivalente por `id` antes de navegar, con fallback al índice de la sección si no existe versión en el idioma destino.
3. **Todo contenido con slug localizado debe validar en build/runtime que ambos idiomas estén definidos.** Ver el validador al final de `lib/data/blog.ts`, que lanza un error explícito (fallando el build) si a un post le falta el slug de algún idioma. Cualquier nueva fuente de datos con este mismo patrón debe incluir una validación equivalente.
4. **Implementación de referencia:** el fix del selector de idioma en blog (slugs distintos entre `/es/blog/...` y `/en/blog/...`) es el patrón a replicar para cualquier página futura con slugs localizados divergentes.
