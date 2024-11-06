import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: [`**/*.js`], languageOptions: { sourceType: `commonjs` } },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'react/prop-types': 0,
      'indent': [
        `error`,
        2
      ],
      'linebreak-style': [
        `error`,
        `windows`
      ],
      'quotes': [
        `error`,
        `backtick`
      ],
      'semi': [
        `error`,
        `always`
      ]
    }
  },
  pluginJs.configs.recommended,
];
