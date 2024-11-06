import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        sourceType: "module",
      }
    },
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
  pluginReact.configs.flat.recommended,
  {
    "extends": [
      "eslint:recommended",
      "plugin:prettier/recommended"
    ],
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
  }
];