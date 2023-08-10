// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/devtools", "@nuxthq/ui"],
  nitro: {
    preset: "cloudflare-pages",
  },
  runtimeConfig: {
    GITHUB_CLIENT_ID:"f49cf9cba9cfca2809b6",  //windows testing
GITHUB_CLIENT_SECRET:"1bb421632ba9f190651af3b53fcd1c7f36a8befc"
  }
});
