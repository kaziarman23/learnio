import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules"] }, // Ignore output folders
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Include JS/TS files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Add browser globals
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true }, // Enable JSX
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    plugins: {
      react, // React-specific linting rules
      "react-hooks": reactHooks, // Enforce rules for React Hooks
      "react-refresh": reactRefresh, // React Fast Refresh
    },
    rules: {
      ...js.configs.recommended.rules, // General JavaScript best practices
      ...react.configs.recommended.rules, // React best practices
      ...react.configs["jsx-runtime"].rules, // JSX Transform rules (React 17+)
      ...reactHooks.configs.recommended.rules, // React Hooks best practices
      "react/jsx-no-target-blank": "off", // Disable target="_blank" warning
      "react/prop-types": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
