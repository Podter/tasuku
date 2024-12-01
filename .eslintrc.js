// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "eslint-plugin-react-compiler"],
  ignorePatterns: [
    "/dist/*",
    "/.expo/*",
    "/.tamagui/*",
    "node_modules",
    ".eslintrc.js",
    "babel.config.js",
  ],
  rules: {
    "prettier/prettier": "warn",
    "react-compiler/react-compiler": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
