import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  {
    plugins: {
      import: importPlugin,
      "@typescript-eslint": tsPlugin,
      "unused-imports": unusedImports,
    },

    ignores: ["node_modules", "dist"],

    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: {
            order: "asc",
            caseInsensitive: false,
            orderImportKind: "asc",
          },
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: true }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "jsx-a11y/anchor-is-valid": "off",
      curly: ["error", "all"],
      "no-irregular-whitespace": [
        "error",
        {
          skipTemplates: true,
          skipStrings: true,
        },
      ],
    },
  },
];
