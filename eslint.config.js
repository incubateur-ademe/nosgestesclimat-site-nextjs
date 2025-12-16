import nextPlugin from '@next/eslint-plugin-next'
import vitest from '@vitest/eslint-plugin'
import nextVanilla from 'eslint-config-next'
import prettier from 'eslint-config-prettier/flat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig(
  {
    // The only way to overload nextJS config with more aggressive ts-eslint rules
    ...nextVanilla[0],
    rules: {
      ...nextVanilla[0].rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // @TODO: Remove this eslint-disable-next-line once we have a proper solution for these rules
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/error-boundaries': 'warn',
      'react-hooks/static-components': 'warn',
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
      'jsx-a11y/no-redundant-roles': 'warn',
    },
  },
  {
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',

      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/unbound-method': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
    },
  },
  prettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
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
    'coverage/**',
    'cypress/**',
    '*.config.js',
    '*.config.ts',
    '*.setup.ts',
    '*.setup.tsx',
    'check-memory.mjs',
    'scripts/**/*',
    'public/**/*.js',
    'public/**/*.html',
    '**/*.stories.tsx',
    '.storybook/**',
    'playwright-report/**',
    'storybook-static/**',
  ])
)

export default eslintConfig
