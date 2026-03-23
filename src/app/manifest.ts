import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CatPlumber — Denver Plumbing Services",
    short_name: "CatPlumber",
    description:
      "Expert plumbing services in Denver, CO. Licensed & insured. Same-day service available.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F0",
    theme_color: "#1B5E8A",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
