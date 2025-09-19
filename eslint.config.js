import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import sveltePlugin from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  { ignores: ["node_modules", "build", ".svelte-kit"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,ts}", "*.{js,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "error",
    },
  },
  // Svelte-Empfehlungen
  ...sveltePlugin.configs["flat/recommended"],
  // Zusätze für Svelte + TypeScript und Browser-Globals
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        // Nutze TypeScript für <script lang="ts">
        parser: tsParser,
        extraFileExtensions: [".svelte"],
      },
      globals: { ...globals.browser },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error",
    },
  },
];