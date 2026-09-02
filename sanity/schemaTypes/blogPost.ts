import { defineArrayMember, defineField, defineType } from "sanity";

// Bilingual content with a localized slug — see CLAUDE.md's "Convenciones de
// contenido bilingüe": the slug lives inside the same document (not a
// separate ES/EN record) and both locales must be filled in before the
// post can be considered complete (enforced by requiring both sub-fields).
// Mirrors the shape of lib/data/blog.ts (id/slug/title/excerpt/category/
// content, etc.) — this schema is what that static file's content was
// migrated into (see scripts/migrate-to-sanity.ts).
const contentBlockTypes = [
  defineArrayMember({
    name: "paragraph",
    title: "Párrafo",
    type: "object",
    fields: [{ name: "text", title: "Texto", type: "text", rows: 4, validation: (rule) => rule.required() }],
    preview: { select: { title: "text" } },
  }),
  defineArrayMember({
    name: "heading",
    title: "Subtítulo",
    type: "object",
    fields: [{ name: "text", title: "Texto", type: "string", validation: (rule) => rule.required() }],
    preview: { select: { title: "text" } },
  }),
  defineArrayMember({
    name: "list",
    title: "Lista",
    type: "object",
    fields: [
      {
        name: "items",
        title: "Elementos",
        type: "array",
        of: [{ type: "string" }],
        validation: (rule) => rule.required().min(1),
      },
    ],
    preview: { select: { title: "items.0" } },
  }),
];

export const blogPost = defineType({
  name: "blogPost",
  title: "Artículo de blog",
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
      name: "extracto",
      title: "Extracto",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 3, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 3, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha de publicación",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "autor",
      title: "Autor",
      description: "Nombre del autor. Si coincide con un miembro del equipo, el sitio resuelve su cargo e iniciales automáticamente.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "object",
      fields: [
        { name: "clave", title: "Clave (sin traducir, para filtrar)", type: "string", validation: (rule) => rule.required() },
        { name: "es", title: "Etiqueta en español", type: "string", validation: (rule) => rule.required() },
        { name: "en", title: "Etiqueta en inglés", type: "string", validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tiempoLectura",
      title: "Tiempo de lectura",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "string", validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "string", validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contenido",
      title: "Contenido",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "array", of: contentBlockTypes, validation: (rule) => rule.required().min(1) },
        { name: "en", title: "Inglés", type: "array", of: contentBlockTypes, validation: (rule) => rule.required().min(1) },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagenPortada",
      title: "Imagen de portada",
      type: "image",
      options: { hotspot: true },
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
