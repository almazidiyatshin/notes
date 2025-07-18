import tsParser from "@typescript-eslint/parser";

export default {
  files: ["**/*.ts"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      project: "./tsconfig.json",
    },
  },
};
