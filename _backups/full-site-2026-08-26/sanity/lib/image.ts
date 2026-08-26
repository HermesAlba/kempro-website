import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { getClient } from "./client";

let builder: ReturnType<typeof imageUrlBuilder> | null = null;

export function urlFor(source: Image) {
  if (!builder) {
    builder = imageUrlBuilder(getClient());
  }
  return builder.image(source);
}
