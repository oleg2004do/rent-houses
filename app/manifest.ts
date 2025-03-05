import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  // Додаємо timestamp для запобігання кешуванню
  const timestamp = Date.now()

  return {
    name: "Journey UA",
    short_name: "JourneyUA",
    description: "Journey UA - Housing assistance for Ukrainian refugees",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0057b7",
    icons: [
      {
        src: `/JOURNEY-UA.png?v=${timestamp}`,
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}

