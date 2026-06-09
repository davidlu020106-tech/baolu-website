import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://baolu-tech.com",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar", "es", "fr", "pt"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          ar: "ar",
          es: "es",
          fr: "fr",
          pt: "pt",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
