<script setup lang="ts"></script>

<template>
  <div>
    <NuxtLink to="/api/auth/cognito" external>
      <Button variant="default">Login with Cognito</Button>
    </NuxtLink>

    <NuxtLink to="/api/auth/github" external>
      <Button variant="default">Login with GitHub</Button>
    </NuxtLink>
  </div>
</template>
