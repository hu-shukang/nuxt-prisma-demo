// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettierConfig from 'eslint-plugin-prettier/recommended';

export default withNuxt({
  ...prettierConfig,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
