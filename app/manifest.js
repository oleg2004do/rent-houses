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
          src: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🇺🇦</text></svg>",
          sizes: "any",
          type: "image/svg+xml",
        },
      ],
    }
  }
  
  