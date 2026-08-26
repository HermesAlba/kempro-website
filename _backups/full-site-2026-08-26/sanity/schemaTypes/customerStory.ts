import { defineField, defineType } from "sanity";

// Bilingual content with a localized slug — see CLAUDE.md's "Convenciones de
// contenido bilingüe": the slug lives inside the same document (not a
// separate ES/EN record) and both locales must be filled in before the
// story can be considered complete (enforced by requiring both sub-fields).
export const customerStory = defineType({
  name: "customerStory",
  title: "Customer story",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "string", validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "string", validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "object",
      fields: [
        {
          name: "es",
          title: "Español",
          type: "slug",
          options: { source: "titulo.es" },
          validation: (rule) => rule.required(),
        },
        {
          name: "en",
          title: "Inglés",
          type: "slug",
          options: { source: "titulo.en" },
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resumen",
      title: "Resumen (para tarjeta y hero)",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 3, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 3, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cuerpo",
      title: "Cuerpo (texto largo)",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 10 },
        { name: "en", title: "Inglés", type: "text", rows: 10 },
      ],
    }),
    defineField({
      name: "categoria",
      title: "Categoría / industria",
      type: "object",
      fields: [
        { name: "clave", title: "Clave (sin traducir, para filtrar)", type: "string", validation: (rule) => rule.required() },
        { name: "es", title: "Etiqueta en español", type: "string", validation: (rule) => rule.required() },
        { name: "en", title: "Etiqueta en inglés", type: "string", validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagenPortada",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cliente",
      title: "Nombre del cliente destacado",
      type: "string",
    }),
    defineField({
      name: "logoCliente",
      title: "Logo del cliente",
      type: "image",
    }),
    defineField({
      name: "destacado",
      title: "Cliente destacado (featured)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "videoUrl",
      title: "URL de video (opcional, para el bloque de contenido en video)",
      type: "url",
    }),
    defineField({
      name: "fecha",
      title: "Fecha de publicación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "titulo.es",
      subtitle: "categoria.es",
      media: "imagenPortada",
    },
  },
});
