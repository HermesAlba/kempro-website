import { defineField, defineType } from "sanity";

// Mirrors lib/data/case-studies.ts. `contenido` (the detail page's Resumen/
// La solución/Impacto/Ventaja Kempro body) is deliberately NOT stored here —
// it's built at render time from problema/solucion/resultado/metricas/
// ventaja, same as the original buildContent() in lib/data/case-studies.ts.
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Caso de éxito",
  type: "document",
  fields: [
    defineField({
      name: "clave",
      title: "Clave (id estable, sin traducir)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cliente",
      title: "Cliente",
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
          options: { source: "cliente.es" },
          validation: (rule) => rule.required(),
        },
        {
          name: "en",
          title: "Inglés",
          type: "slug",
          options: { source: "cliente.en" },
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industria",
      title: "Industria",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "string", validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "string", validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "industriaClave",
      title: "Clave de industria",
      description: "Determina la foto compartida de esa industria (ver INDUSTRY_IMAGE en lib/data/case-studies.ts) y el ícono de respaldo.",
      type: "string",
      options: {
        list: [
          "salud",
          "restaurantes",
          "arquitectura",
          "construccion",
          "cajas-compensacion",
          "tecnologia",
          "retail",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fecha",
      title: "Fecha",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "esInterno",
      title: "Caso interno de Kempro",
      description: 'Marca los casos donde Kempro es su propio cliente (evita el texto "X se asoció con Kempro").',
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "problema",
      title: "El problema",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 4, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 4, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "solucion",
      title: "La solución",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 4, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 4, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resultado",
      title: "El resultado",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 4, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 4, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metricas",
      title: "Métricas",
      type: "object",
      fields: [
        {
          name: "es",
          title: "Español",
          type: "array",
          of: [
            {
              type: "object",
              name: "metrica",
              fields: [
                { name: "value", title: "Valor", type: "string", validation: (rule) => rule.required() },
                { name: "label", title: "Etiqueta", type: "string", validation: (rule) => rule.required() },
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            },
          ],
          validation: (rule) => rule.required().min(1),
        },
        {
          name: "en",
          title: "Inglés",
          type: "array",
          of: [
            {
              type: "object",
              name: "metrica",
              fields: [
                { name: "value", title: "Valor", type: "string", validation: (rule) => rule.required() },
                { name: "label", title: "Etiqueta", type: "string", validation: (rule) => rule.required() },
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            },
          ],
          validation: (rule) => rule.required().min(1),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ventaja",
      title: "Ventaja Kempro",
      description: "El diferenciador específico de este proyecto — no una reafirmación genérica de la filosofía de Kempro.",
      type: "object",
      fields: [
        { name: "es", title: "Español", type: "text", rows: 4, validation: (rule) => rule.required() },
        { name: "en", title: "Inglés", type: "text", rows: 4, validation: (rule) => rule.required() },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      description: "Foto compartida por industria — usada como miniatura y como imagen del hero de la página de detalle.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "cliente.es",
      subtitle: "industria.es",
      media: "imagen",
    },
  },
});
