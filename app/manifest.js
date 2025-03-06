export default function manifest() {
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
          src: "/JOURNEY-UA.png",
          sizes: "500x500",
          type: "image/png",
        },
      ],
    }
  }
  
  