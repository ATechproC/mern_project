import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Node.js files configuration
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node, // This includes process, console, require, etc.
      }
    },
    rules: {
      // Optional: Add Node.js specific rules
      "no-process-exit": "off",
    }
  },
  
  // Browser files configuration (if you have any)
  {
    files: ["public/**/*.js", "client/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      }
    }
  }
]);