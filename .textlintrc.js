/** @type {import('textlint/lib/config/config').Config */

const config = {
  filters: {},
  rules: {
    "ja-hiragana-fukushi": true,
    "ja-hiragana-hojodoushi": true,
    "ja-hiragana-keishikimeishi": true,
    "preset-ja-technical-writing": true,
    "@proofdict/proofdict": {
      dictURL: "https://azu.github.io/proof-dictionary/",
    },
  },
};

module.exports = config;
