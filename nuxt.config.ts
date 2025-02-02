// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'dayjs-nuxt',
    'nuxt-auth-utils',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  dayjs: {
    locales: ['ja'],
    plugins: ['utc', 'timezone'],
    defaultLocale: 'ja',
  },
});
