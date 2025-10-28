import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tslint.configs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "app/tailwind.css",
      },
    },
  },
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
      "better-tailwindcss": eslintPluginBetterTailwindcss,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
        },
      ],
    },
  },
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
      ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
      "react-hooks/refs": 0,
      "better-tailwindcss/enforce-consistent-line-wrapping": 0,
      "@typescript-eslint/ban-ts-comment": 0,
      "better-tailwindcss/multiline": [0, { printWidth: 300 }],
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
