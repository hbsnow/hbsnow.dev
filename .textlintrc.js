/** @type {import('textlint/lib/config/config').Config */

const config = {
  filters: {},
  rules: {
    "ja-hiragana-fukushi": true,
    "ja-hiragana-hojodoushi": true,
    "ja-hiragana-keishikimeishi": true,
    "preset-ja-technical-writing": {
      "sentence-length": {
        max: 150,
      },
    },
    "preset-ja-spacing": true,
    "@proofdict/proofdict": {
      dictURL: "https://azu.github.io/proof-dictionary/",
    },
  },
};

module.exports = config;
