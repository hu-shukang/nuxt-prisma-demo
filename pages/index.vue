<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
const { loggedIn, user, session, clear } = useUserSession();
</script>

<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user.login }}!</h1>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <NuxtLink to="/api/auth/github" external>login with github</NuxtLink>
    <br />
    <NuxtLink to="/api/auth/cognito" external>login with cognito</NuxtLink>
  </div>
</template>
