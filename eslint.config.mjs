import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import githubPlugin from "eslint-plugin-github";
import jsdocPlugin from "eslint-plugin-jsdoc";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      jsdoc: jsdocPlugin,
      github: githubPlugin,
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-undef": "off",
      "no-unused-vars": "off",
      "jsdoc/require-returns-check": "warn",
      "github/no-then": "warn",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["webpack.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
];
