/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },

  // Base config
  extends: ["eslint:recommended"],
  ignorePatterns: ["app/generated/*", "public/*", "node_modules/*", "dist/*"],
  overrides: [
    // React
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        // "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
        "import/resolver": {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint", "import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
      rules: {
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
        "import/no-named-as-default": 0,
        "import/no-unresolved": 0,
        "import/namespace": 0,
        "import/no-duplicates": 0,
        "import/default": 0,
        "import/no-named-as-default-member": 0,
        "react/jsx-no-target-blank": 0,
        "no-empty": 0,
        "no-empty-pattern": 0,
        "no-unsafe-optional-chaining": 0,
      },
    },

    // Node
    {
      files: [".eslintrc.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
