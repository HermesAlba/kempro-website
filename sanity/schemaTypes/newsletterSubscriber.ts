import { defineField, defineType } from "sanity";

export const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter subscriber",
  type: "document",
  fields: [
    defineField({
      name: "correo",
      title: "Correo",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "idioma",
      title: "Idioma",
      type: "string",
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
      title: "correo",
      subtitle: "idioma",
    },
  },
});
