module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'unused-imports', 'prettier'],
  rules: {
    'no-unused-vars': 1,
    'prettier/prettier': 1,
    quotes: 0,
    'react/prop-types': 0
  }
};
