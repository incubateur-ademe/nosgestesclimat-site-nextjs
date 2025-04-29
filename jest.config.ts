/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './src',
})

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '^next-i18n-router/(.*)$':
      '<rootDir>/node_modules/next-i18n-router/dist/$1',
    '^next-i18n-router$': '<rootDir>/node_modules/next-i18n-router/dist',
    '^yaml$': '<rootDir>/src/__mocks__/yaml.ts',
  },

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // The regexp pattern or array of patterns that Jest uses to detect test files
  testRegex: '.*\\.test\\.(ts|tsx)$',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
    '\\.yaml$': 'yaml-jest-transform',
    'node_modules/yaml/.+\\.(j|t)s$': '@swc/jest',
  },

  moduleFileExtensions: ['js', 'ts', 'tsx', 'yaml', 'json'],

  transformIgnorePatterns: [
    '/node_modules/(?!(next-i18n-router|yaml|@publicodes)/)',
  ],
  setupFilesAfterEnv: ['./jest.setup.tsx'],
}

export default createJestConfig(config)
