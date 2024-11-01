// eslint.config.js

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
    {
      files: ["**/*.js"],
      languageOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        globals: {
          // 필요에 따라 전역 변수를 추가할 수 있습니다
          window: "readonly",
          document: "readonly",
        },
      },
      rules: {
        "no-unused-vars": "warn",
        "eqeqeq": "error",
        // 추가 규칙을 여기에 정의할 수 있습니다
      },
    },
  ];
  
  module.exports = config;
