# Kempro SAS — Sitio web corporativo

Sitio web corporativo de **Kempro SAS**, consultora de estrategia e implementación de IA (estrategia de IA, agentes de automatización, integración de LLMs en procesos de negocio).

## Stack técnico

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript estricto
- [Tailwind CSS v4](https://tailwindcss.com)
- [next-intl](https://next-intl.dev) para internacionalización ES/EN con selector de idioma persistente
- `next/image` y `next/font` (Work Sans) para optimización
- Metadata API de Next.js para SEO (title/description/Open Graph por página)
- `sitemap.xml` y `robots.txt` generados dinámicamente
- [Sanity](https://www.sanity.io) embebido en `/studio` para guardar los envíos del formulario de contacto (ver sección dedicada más abajo)
- Listo para desplegar en [Vercel](https://vercel.com) sin configuración adicional

## Estructura del proyecto

```
app/
  [locale]/            Páginas localizadas (es/en)
    page.tsx            Inicio
    servicios/           Servicios
    casos-de-exito/      Casos de éxito
    sobre-nosotros/       Sobre nosotros
    blog/                Blog (listado + [slug])
    contacto/            Contacto
    layout.tsx           Layout raíz (html/body, header, footer)
  api/contact/route.ts  API route del formulario de contacto
  studio/[[...tool]]/   Sanity Studio embebido (/studio)
  sitemap.ts / robots.ts
components/
  layout/                Header, Footer, selector de idioma
  ui/                     Primitivos (botones, contenedor, animación FadeIn, íconos)
  sections/               Bloques de página reutilizables
  blog/, contact/         Componentes específicos de sección
lib/data/                Datos de contenido (servicios, casos de éxito, equipo, blog)
i18n/                    Configuración de next-intl (routing, navigation, request)
messages/                Textos de interfaz es.json / en.json
sanity/                  Schema y clientes de Sanity (env.ts, schemaTypes/, lib/)
sanity.config.ts         Configuración del Studio embebido
```

### Sistema de colores

Toda la paleta de marca vive como variables CSS en `app/globals.css` (bloque `:root` + `@theme inline`). Es la paleta temporal solicitada (primario índigo `#4F46E5`, acento cian `#06B6D4`, fondo oscuro `#0F172A`). Para rebrandear el sitio, solo hay que editar los valores en ese archivo — ningún componente tiene colores hardcodeados.

El modo oscuro no está activado (el sitio usa modo claro por defecto), pero la estructura ya deja las variables listas: ver el bloque comentado `.dark` en `app/globals.css`.

## Requisitos

- Node.js 20+
- npm (o el gestor de paquetes de tu preferencia)

## Correr el proyecto en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). La ruta raíz redirige automáticamente a `/es` (idioma por defecto); el sitio en inglés vive bajo `/en`.

### Scripts disponibles

```bash
npm run dev     # servidor de desarrollo
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint    # ESLint
```

## Formulario de contacto

El formulario en `/contacto` envía los datos a la API route `app/api/contact/route.ts`, que valida el payload, lo registra en el log del servidor, guarda el envío en Sanity (ver abajo) y envía un correo de notificación por [Resend](https://resend.com) a `marketing@kemprocol.com` y `hermesalba@gmail.com`.

### Configuración del correo de notificación (Resend)

1. Crea una cuenta en [resend.com](https://resend.com) y verifica el dominio `kemprocol.com` (o el dominio que uses para enviar) en **Domains**, para poder enviar desde `notificaciones@kemprocol.com`.
2. Genera una API key en [resend.com/api-keys](https://resend.com/api-keys).
3. Copia `.env.example` a `.env.local` (si no lo has hecho ya) y agrega:
   ```
   RESEND_API_KEY=tu-api-key
   ```
4. Envía un mensaje de prueba desde `/contacto` y confirma que llegue a ambas bandejas.

Sin `RESEND_API_KEY` configurada, el formulario sigue funcionando con normalidad — el envío de correo simplemente se omite (se registra un log, no se rompe el envío).

En producción (Vercel), agrega `RESEND_API_KEY` en **Project Settings → Environment Variables**.

### Protección anti-spam (Google reCAPTCHA v3)

El formulario usa [reCAPTCHA v3](https://www.google.com/recaptcha/about/) (invisible, sin fricción para el usuario) para filtrar envíos automatizados. El frontend obtiene un token al enviar el formulario y la API route lo valida contra la API de Google antes de procesar el envío (Resend/Sanity).

1. Registra un sitio **v3** en [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) con el dominio de producción (y `localhost` para pruebas locales).
2. Copia `.env.example` a `.env.local` (si no lo has hecho ya) y agrega:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu-site-key
   RECAPTCHA_SECRET_KEY=tu-secret-key
   ```
3. Envía un mensaje de prueba desde `/contacto` y confirma que se procese con normalidad.

Sin estas variables configuradas, el formulario sigue funcionando con normalidad — la verificación simplemente se omite. Una vez configuradas, la API route **rechaza** los envíos cuyo token de reCAPTCHA no sea válido o cuyo puntaje sea menor a 0.5.

En producción (Vercel), agrega `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` y `RECAPTCHA_SECRET_KEY` en **Project Settings → Environment Variables**.

## Consentimiento de cookies y Google Analytics

El sitio muestra un banner de consentimiento de cookies (`components/cookie-consent/`) en la primera visita, con opciones "Aceptar todas", "Rechazar todas" y un panel de gestión con dos categorías: **Necesarias** (siempre activas) y **Analíticas** (controla si se carga Google Analytics 4). La decisión se guarda en `localStorage` y no se vuelve a preguntar en visitas posteriores. El texto "política de cookies" del banner enlaza a la sección de cookies dentro de `/aviso-de-privacidad#cookies`.

GA4 solo se carga si **ambas** condiciones se cumplen: el usuario aceptó la categoría "Analíticas" y `NEXT_PUBLIC_GA_MEASUREMENT_ID` está configurada.

1. Crea una propiedad GA4 en [analytics.google.com](https://analytics.google.com) y copia el ID de medición (`G-XXXXXXX`).
2. Copia `.env.example` a `.env.local` (si no lo has hecho ya) y agrega:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
   ```
3. Recarga el sitio, acepta las cookies analíticas desde el banner (o desde el panel de gestión) y confirma en el Network tab que se cargó `gtag/js`.

Sin `NEXT_PUBLIC_GA_MEASUREMENT_ID` configurada, el banner y el panel de gestión funcionan igual, simplemente no hay ningún script de analítica que cargar.

En producción (Vercel), agrega `NEXT_PUBLIC_GA_MEASUREMENT_ID` en **Project Settings → Environment Variables**.

## Sanity CMS (guardado de contactos)

El proyecto incluye [Sanity](https://www.sanity.io) embebido como Studio en `/studio`, con un único tipo de contenido por ahora: `contactSubmission` (los envíos del formulario de contacto). El contenido editorial del sitio (servicios, blog, etc.) **no** está migrado a Sanity todavía — sigue viviendo en `lib/data/*.ts`.

### Configuración inicial (una sola vez)

1. Crea una cuenta y un proyecto en [sanity.io/manage](https://www.sanity.io/manage) (o corre `npx sanity@latest init` desde la raíz del proyecto y sigue el flujo interactivo de login/creación). Anota el **Project ID** y el **dataset** (usa `production` si no tienes preferencia).
2. Copia `.env.example` a `.env.local` y completa:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. En sanity.io/manage → tu proyecto → **API → Tokens**, crea un token con permisos de **Editor** (o **Write**) y pégalo en `.env.local` como `SANITY_API_WRITE_TOKEN`. Este token nunca debe exponerse al cliente ni commitearse.
4. Corre `npm run dev` y entra a [http://localhost:3000/studio](http://localhost:3000/studio) para confirmar que el Studio carga correctamente.
5. Envía un mensaje de prueba desde `/contacto` y verifica que aparezca en el Studio, dentro del tipo **Contact submission**.

Sin estas variables configuradas, el sitio y el formulario siguen funcionando con normalidad — el guardado en Sanity simplemente se omite (se registra un log, no se rompe el envío).

En producción (Vercel), agrega las mismas tres variables en **Project Settings → Environment Variables**.

## Internacionalización

- Idiomas soportados: `es` (por defecto) y `en`.
- Los textos de interfaz están en `messages/es.json` y `messages/en.json`.
- El contenido editorial (servicios, casos de éxito, equipo, posts del blog) vive en `lib/data/*.ts`, con los textos en español e inglés definidos lado a lado — son placeholders realistas, fáciles de reemplazar por contenido real.
- Las rutas usan slugs localizados (por ejemplo `/es/servicios` y `/en/services`) configurados en `i18n/routing.ts`.
- La preferencia de idioma del usuario se persiste automáticamente en la cookie `NEXT_LOCALE` a través del middleware de next-intl (`proxy.ts`).

## Despliegue en Vercel

1. Sube el repositorio a GitHub/GitLab/Bitbucket.
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio — Vercel detecta Next.js automáticamente y no requiere configuración adicional.
3. Si vas a conectar un proveedor de email (ver sección anterior), agrega las variables de entorno necesarias (por ejemplo `RESEND_API_KEY`) en **Project Settings → Environment Variables**.
4. Despliega. Cada push a la rama principal genera un nuevo deployment de producción.

Antes de dar por cerrado un cambio, valida siempre con:

```bash
npm run build
```
