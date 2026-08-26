import type { MetadataRoute } from "next";
import { KEMPRO_PRIMARY } from "@/lib/kempro-symbol";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kempro",
    short_name: "Kempro",
    description:
      "Consultoría e implementación de IA: estrategia, agentes de automatización e integración de LLMs para empresas.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: KEMPRO_PRIMARY,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
