import { defineField, defineType } from "sanity";

// Mirrors lib/data/team.ts. Team members aren't slug-routed (no detail
// page), so — unlike the other content schemas — there's no bilingual slug
// pair here, just a name and a localized role.
export const teamMember = defineType({
  name: "teamMember",
  title: "Miembro del equipo",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      description: "Debe coincidir con el nombre de autor usado en los artículos de blog para que el sitio resuelva su cargo e iniciales automáticamente.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rol",
      title: "Cargo",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "string", validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "string", validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "iniciales",
      title: "Iniciales",
      type: "string",
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: "orden",
      title: "Orden de aparición",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "nombre",
      subtitle: "rol.es",
    },
  },
});
