import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Server-only client used to write documents (e.g. contact form
// submissions) to Sanity. Requires SANITY_API_WRITE_TOKEN, a token with
// "Editor" or "Write" permissions created at sanity.io/manage — never
// expose this token to the client.
//
// Created lazily (not at module load time) so the app keeps building and
// running before a real Sanity project is configured.
let cachedClient: SanityClient | null = null;

export function getWriteClient(): SanityClient {
  if (!cachedClient) {
    cachedClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN,
    });
  }
  return cachedClient;
}
