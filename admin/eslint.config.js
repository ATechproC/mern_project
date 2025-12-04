// eslint.config.js
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
