import { defineField, defineType } from "sanity";

export const customerReview = defineType({
  name: "customerReview",
  title: "Customer review",
  type: "document",
  fields: [
    defineField({
      name: "fuente",
      title: "Fuente",
      type: "string",
      options: { list: ["Gartner", "G2"] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cita",
      title: "Cita",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 3, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 3, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rolResenador",
      title: "Rol del reseñador",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "string" },
        { name: "en", title: "Inglés", type: "string" },
      ],
    }),
    defineField({
      name: "link",
      title: "Link a la reseña completa",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "cita.es",
      subtitle: "fuente",
    },
  },
});
