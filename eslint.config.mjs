/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
import { fixupPluginRules } from "@eslint/compat";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwind from "eslint-plugin-tailwindcss";
import tslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  eslintConfigPrettier,
  {
    ignores: ["**/generated/**"],
  },
  {
    plugins: {
      react: fixupPluginRules(react),
    },
    rules: react.configs["jsx-runtime"].rules,
  },
  {
    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/no-import-type-side-effects": 1,
      "@typescript-eslint/no-unused-vars": 0,
      "@typescript-eslint/no-empty-object-type": 0,
      "no-empty-pattern": 0,
      "no-empty": 0,
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
