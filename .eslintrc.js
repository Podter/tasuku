// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier", "eslint-plugin-react-compiler"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "prettier/prettier": "warn",
    "react-compiler/react-compiler": "warn",
  },
};
