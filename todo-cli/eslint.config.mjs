import { defineConfig } from 'eslint';

export default defineConfig({
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Ensures compatibility with Prettier
  ],
  parserOptions: {
    ecmaVersion: 2020, // Set ECMAScript version
    sourceType: 'module', // Support ES6 module syntax
  },
  env: {
    node: true, // Node.js environment
    es2021: true, // Support ES2021 features
  },
  rules: {
    // Add any custom rules here if needed
    'no-console': 'warn', // Example: Warn when using console.log
  },
});
