import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules (fs, path, etc.)
            "external", // External packages (react, next, etc.)
            "internal", // Internal modules
            "parent", // Parent imports (../)
            "sibling", // Sibling imports (./)
            "index", // Index imports (./index)
            "object", // Object imports
            "type", // Type imports
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  // Prettier doit être en dernier pour désactiver les règles ESLint qui entrent en conflit
  prettierConfig,
]);

export default eslintConfig;
