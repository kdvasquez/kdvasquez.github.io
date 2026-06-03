import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://kdvasquez.github.io",
    integrations: [
      mdx(), 
      icon()
    ],      
    devToolbar: {
      enabled: false,
    },
    vite: {
      resolve: {
        alias: {
          '@components': '/src/components',
          '@layouts': '/src/layouts',
          '@assets': '/src/assets',
          '@data': '/src/data',
        }
      }
    }
});
