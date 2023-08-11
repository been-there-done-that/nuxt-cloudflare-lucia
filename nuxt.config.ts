// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/devtools", "@nuxthq/ui"],
  nitro: {
    preset: "cloudflare-pages",
  },
  runtimeConfig: {
    GITHUB_CLIENT_ID:"f49cf9cba9cfca2809b6",  //windows testing
GITHUB_CLIENT_SECRET:"1bb421632ba9f190651af3b53fcd1c7f36a8befc"//
// GITHUB_CLIENT_ID:"62ef74fce9e6fa5f3676",  //local testing bonkers
// GITHUB_CLIENT_SECRET:"1df523d28176e72c15d51086da4c481a7ec86621"
  }
});
