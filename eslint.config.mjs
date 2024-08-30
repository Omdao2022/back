import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import typescript from "@typescript-eslint/parser";

export default [
  eslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs["recommended"].rules,
      "no-unused-vars": "off", // Turn off ESLint's rule
      "@typescript-eslint/no-unused-vars": "error", // Use TypeScript-specific rule
      "no-undef": "off", // TypeScript handles this
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
];