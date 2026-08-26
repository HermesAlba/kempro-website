import type { SchemaTypeDefinition } from "sanity";
import { contactSubmission } from "./contactSubmission";
import { newsletterSubscriber } from "./newsletterSubscriber";
import { customerStory } from "./customerStory";
import { customerReview } from "./customerReview";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contactSubmission, newsletterSubscriber, customerStory, customerReview],
};
