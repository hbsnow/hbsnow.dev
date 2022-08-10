/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */

const config = {
  extends: ["next", "next/core-web-vitals", "prettier"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};

module.exports = config;
