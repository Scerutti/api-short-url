module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'import',
    'simple-import-sort',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '.gitignore', 'node_modules/'],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "no-duplicate-imports": "error",
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "no-console": "warn",
    "import/order": ["error", {
      "groups": [["builtin", "external", "internal"]],
      "newlines-between": "always"
    }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
};
