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
    'jest'
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
    "jest/valid-expect": "error"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
