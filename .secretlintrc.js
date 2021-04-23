/** @type {import('@secretlint/node').SecretLintEngineOptions} */

const config = {
  rules: [
    {
      id: "@secretlint/secretlint-rule-preset-recommend",
    },
  ],
};

module.exports = config;
