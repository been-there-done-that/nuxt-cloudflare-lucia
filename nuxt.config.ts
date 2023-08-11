// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/devtools", "@nuxthq/ui"],
  nitro: {
    preset: "cloudflare-pages",
  },
  runtimeConfig: {
    GITHUB_CLIENT_ID:process.env.GITHUB_CLIENT_ID,
GITHUB_CLIENT_SECRET:process.env.GITHUB_CLIENT_SECRET
  }
});
