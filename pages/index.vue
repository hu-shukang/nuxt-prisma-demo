<script setup lang="ts">
import { Button } from '@/components/ui/button';

definePageMeta({
  middleware: ['auth'],
});
const { user, session, clear } = useUserSession();
const { data } = await useFetch('/api/home');
</script>

<template>
  <div>
    <h1>Welcome {{ user }}!</h1>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <Button @click="clear">Logout</Button>
    <hr />
    {{ data?.message }}
  </div>
</template>
