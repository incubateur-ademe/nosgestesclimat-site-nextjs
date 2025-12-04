import typescriptParser from '@typescript-eslint/parser'
import vitest from '@vitest/eslint-plugin'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      // @TODO: Remove this eslint-disable-next-line once we have a proper solution for these rules
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/static-components': 'off',
      'react/no-unescaped-entities': [
        'error',
        {
          forbid: [
            {
              char: '>',
              alternatives: ['&gt;'],
            },
            {
              char: '}',
              alternatives: ['&#125;'],
            },
          ],
        },
      ],
      ...jsxA11y.configs.strict.rules,
      'jsx-a11y/no-redundant-roles': 'off',
    },
  },
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
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/require-await': 'error',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
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
    'playwright-report/**',
  ]),
])

export default eslintConfig
