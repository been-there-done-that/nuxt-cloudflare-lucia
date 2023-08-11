<script lang="ts" setup>
const { data } = await useFetch("/api/user");
if (!data.value) throw createError("Failed to fetch data");
const user = data.value.user;
if (!user) await navigateTo("/login");


const bodyData = ref({})

const handleLogout = async () => {
  try {
    await $fetch("/api/logout", {
      method: "POST",
    });

    navigateTo("/login");
  } catch (error) {
    console.log(error);
  }
};

const FetchData = async () => {
    const data = await useFetch('/api/data/planet')
  console.log({data})
  bodyData.value = data
}
</script>
<template>
  <UContainer class="h-screen flex justify-center items-center flex-col">
      <pre>{{ bodyData }}</pre>
    <UCard>
      <template #header>
        This page is protected and can only be accessed by authenticated users.
      </template>

      <pre class="code">{{ JSON.stringify(user, null, 2) }}</pre>
      <template #footer class="foat-right">
        <UButton label="Logout" @click="handleLogout" />
          <UButton label="Api Data" @click="FetchData" />
      </template>
    </UCard>
  </UContainer>
</template>
