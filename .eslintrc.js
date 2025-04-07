// .eslintrc.js

// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@typescript-eslint/recommended',
    'next/core-web-vitals', // Next.js特定的规则
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  "rules": {
      "no-bitwise": "off",
      "no-empty": "off",
      "no-restricted-globals": "off",
      "func-names": [
          "warn",
          "never",
          {
              "generators": "always"
          }
      ],
      "max-classes-per-file": "off",
      "react/no-danger": "off",
      "react/no-array-index-key": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/default-props-match-prop-types": "off",
      "react/destructuring-assignment": "off",
      "prettier/prettier": "error",
      "import/extensions": [
          "error",
          "ignorePackages",
          {
              "js": "never",
              "ts": "never",
              "jsx": "never",
              "tsx": "never"
              //        "jpg": "never",
              //        "png": "never"
          }
      ],
      "import/no-extraneous-dependencies": "off",
      "@typescript-eslint/no-unused-vars": [
          "error",
          {
              "argsIgnorePattern": "^_",
              "varsIgnorePattern": "^_"
          }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off"
  },
};