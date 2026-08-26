import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Created lazily (not at module load time) so the app keeps building and
// running before a real Sanity project is configured.
let cachedClient: SanityClient | null = null;

export function getClient(): SanityClient {
  if (!cachedClient) {
    cachedClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return cachedClient;
}
