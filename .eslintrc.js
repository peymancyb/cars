module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "plugin:prettier/recommended", 
    "prettier/react", 
    "prettier/standard",
    "plugin:jest/recommended",
    "plugin:testing-library/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-hooks',
    'jest',
    'testing-library'
  ],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "import/extensions": ['error', 'always', {
      ts: 'never',
      tsx: 'never',
      js: 'never',
      jsx: 'never',
    }],
    "no-unused-vars": [
      "warn",
      { 
          "vars": "all",
          "varsIgnorePattern": "[I]\\w+"
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "testing-library/await-async-query": "error",
    "testing-library/no-await-sync-query": "error",
    "testing-library/no-debug": "warn"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
