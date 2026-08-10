import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact submission",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "correo",
      title: "Correo",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "empresa",
      title: "Empresa",
      type: "string",
    }),
    defineField({
      name: "mensaje",
      title: "Mensaje",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "nombre",
      subtitle: "correo",
    },
  },
});
