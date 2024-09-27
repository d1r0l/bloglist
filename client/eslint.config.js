const eslint = require('@eslint/js')
const globals = require('globals')
const react = require('eslint-plugin-react')
const reactRedux = require('eslint-plugin-react-redux')
const jest = require('eslint-plugin-jest')
const prettier = require('eslint-plugin-prettier')
const cypress = require('eslint-plugin-cypress/flat')

module.exports = [
  eslint.configs.recommended,
  react.configs.flat.recommended,
  cypress.configs.recommended,
  {
    ...jest.configs['flat/recommended'],
    files: ['**/*.js'],
    plugins: {
      react,
      'react-redux': reactRedux,
      jest,
      cypress,
      prettier
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      ...reactRedux.configs.recommended.rules,
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'never'],
      'react/react-in-jsx-scope': 0,
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },
    settings: {
      react: { version: 'detect' }
    }
  },
  {
    files: ['**/*.config.js'],
    languageOptions: {
      sourceType: 'commonjs'
    }
  },
  {
    ignores: ['**/build/**/*.js']
  }
]
