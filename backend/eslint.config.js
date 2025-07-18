import tsParser from "@typescript-eslint/parser";
import localConfig from "../eslint.config.js";

export default [
  ...localConfig,
  {
    ignores: ["node_modules", "dist"],
    rules: {
      "no-console": "warn",
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
];
