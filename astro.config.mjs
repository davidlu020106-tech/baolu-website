import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://baolu-tech.com",
  trailingSlash: "always",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
