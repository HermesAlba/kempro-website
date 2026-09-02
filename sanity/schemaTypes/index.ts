import type { SchemaTypeDefinition } from "sanity";
import { contactSubmission } from "./contactSubmission";
import { newsletterSubscriber } from "./newsletterSubscriber";
import { customerStory } from "./customerStory";
import { customerReview } from "./customerReview";
import { blogPost } from "./blogPost";
import { service } from "./service";
import { caseStudy } from "./caseStudy";
import { teamMember } from "./teamMember";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    contactSubmission,
    newsletterSubscriber,
    customerStory,
    customerReview,
    blogPost,
    service,
    caseStudy,
    teamMember,
  ],
};
