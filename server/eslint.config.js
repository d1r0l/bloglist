const eslint = require('@eslint/js')
const prettier = require('eslint-plugin-prettier')
const jest = require('eslint-plugin-jest')
const globals = require('globals')
const configPrettier = require('eslint-config-prettier')

/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = [
  eslint.configs.recommended,
  configPrettier,
  {
    ...jest.configs['flat/recommended'],
    files: ['**/*.js'],
    plugins: {
      prettier
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'linebreak-style': ['error', 'unix'],
      eqeqeq: 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 1,
      'prettier/prettier': 'error'
    }
  },
  {
    ignores: ['**/node_modules/**', '**/build/**', '**/tests/**']
  }
]

// module.exports = {
//   env: {
//     commonjs: true,
//     es2021: true,
//     node: true,
//     jest: true
//   },
//   extends: 'eslint:recommended',
//   parserOptions: {
//     ecmaVersion: 'latest'
//   },
//   plugins: ['prettier'],
//   rules: {
//     'linebreak-style': ['error', 'unix'],
//     'eqeqeq': 'error',
//     'no-console': 1
//   },
//   ignorePatterns: ['**/build/**/*.js']
// }
