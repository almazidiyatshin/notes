import tsParser from "@typescript-eslint/parser";
import localConfig from "../eslint.config.js";

export default [
  ...localConfig,
  { ignores: ["node_modules", "dist"] },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@notes/backend/**", "!@notes/backend/**/", "!@notes/backend/**/input"],
              allowTypeImports: true,
              message: "Only types and input schemas are allowed to be imported from backend workspace",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["vite.config.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  },
];
