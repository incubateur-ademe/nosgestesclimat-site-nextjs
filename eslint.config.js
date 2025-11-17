import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  // Base configuration
  js.configs.recommended,
  prettier,

  // TypeScript files configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly',
        JSX: 'readonly',
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.strict.rules,

      // Custom rules from .eslintrc.json
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/require-await': 'error',

      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-undef': 'error',
      'react/display-name': 'error',
      'react/jsx-no-target-blank': 'error',

      'react-hooks/exhaustive-deps': 'error',

      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-redundant-roles': 'off',

      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-unreachable': 'error',
      'no-irregular-whitespace': 'off',
    },
  },

  // JavaScript files configuration
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly',
        JSX: 'readonly',
        NodeJS: 'readonly',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.strict.rules,

      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-undef': 'error',
      'react/display-name': 'error',
      'react/jsx-no-target-blank': 'error',

      'react-hooks/exhaustive-deps': 'error',

      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/no-redundant-roles': 'off',

      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-unreachable': 'error',
      'no-irregular-whitespace': 'off',
    },
  },

  // Test files and mocks
  {
    files: [
      '**/__tests__/**/*',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/__mocks__/**/*',
      'jest.setup.tsx',
      'vitest.setup.ts',
      'vitest.config.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
        React: 'readonly',
        JSX: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        __dirname: 'readonly',
      },
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'tests/**/*',
      '.next/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '*.config.js',
      '*.config.ts',
      '*.setup.ts',
      '*.setup.tsx',
      'check-memory.mjs',
      'scripts/**/*.mjs',
      'scripts/**/*.cjs',
      'scripts/**/*.js',
      'public/mockServiceWorker.js',
      'next-env.d.ts',
      '**/*.stories.tsx',
      '.storybook/**',
    ],
  },
]
