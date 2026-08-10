import type { SchemaTypeDefinition } from "sanity";
import { contactSubmission } from "./contactSubmission";
import { newsletterSubscriber } from "./newsletterSubscriber";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactSubmission, newsletterSubscriber],
};
