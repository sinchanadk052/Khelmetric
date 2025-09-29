module.exports = {
  root: true,
  env: { es2021: true, node: true, jest: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-native'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  ignorePatterns: ['node_modules/', 'android/', 'ios/', '.expo/', 'dist/', 'build/'],
};
