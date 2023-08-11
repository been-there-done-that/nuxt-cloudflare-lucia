export default defineEventHandler(async (event) => {
  const data = await $fetch('https://api.apis.guru/v2/list.json');
  console.log({data})
    return {
      status: "ok",
      data
    }
});