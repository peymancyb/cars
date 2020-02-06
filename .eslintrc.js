module.exports = {
  env: {
    browser: true,
    es6: true,
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
    'react-hooks'
  ],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "import/extensions": ['error', 'always', {
      ts: 'never',
      tsx: 'never'
    }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx"]
      }
    }
  },
};
