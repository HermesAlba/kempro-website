import { defineField, defineType } from "sanity";

// Mirrors lib/data/services.ts. `contenido` (the detail page's Resumen/Cómo
// trabajamos/Para quién es body) is deliberately NOT stored here — it's
// built at render time from descripcion/comoTrabajamos/paraQuienEs, same as
// the original buildContent() in lib/data/services.ts, so this data isn't
// duplicated between a "content" field and its own source fields.
export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({
      name: "clave",
      title: "Clave (id estable, sin traducir)",
      description: 'Identificador interno estable, p. ej. "strategy", "automation" — no cambia entre idiomas.',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "orden",
      title: "Orden de aparición",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icono",
      title: "Ícono",
      type: "string",
      options: {
        list: ["strategy", "automation", "integration", "intranet", "web", "process"],
      },
      validation: (rule) => rule.required(),
    }),
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
      name: "descripcion",
      title: "Descripción",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 3, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 3, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beneficios",
      title: "Beneficios",
      type: "object",
      fields: [
        {
          name: "es",
          title: "Español",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.required().min(1),
        },
        {
          name: "en",
          title: "Inglés",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.required().min(1),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comoTrabajamos",
      title: "Cómo trabajamos",
      type: "object",
      fields: [
        {
          name: "es",
          title: "Español",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.required().min(1),
        },
        {
          name: "en",
          title: "Inglés",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.required().min(1),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paraQuienEs",
      title: "Para quién es",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 3, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 3, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "titulo.es",
      subtitle: "clave",
    },
  },
});
