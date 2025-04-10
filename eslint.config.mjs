/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintPluginReadableTailwind from "eslint-plugin-readable-tailwind";
import tslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["**/generated/**"],
  },
  {
    plugins: {
      react,
    },
    rules: react.configs["jsx-runtime"].rules,
  },
  {
    plugins: {
      "react-hooks": reactHooks,
      "readable-tailwind": eslintPluginReadableTailwind,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...eslintPluginReadableTailwind.configs.warning.rules,
      ...eslintPluginReadableTailwind.configs.error.rules,
      "@typescript-eslint/ban-ts-comment": 0,
      "readable-tailwind/multiline": [0, { printWidth: 300 }],
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
