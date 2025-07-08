import { faker } from '@faker-js/faker'
import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'
import { mswServer } from './src/__tests__/server'

// Mock next-i18n-router/client
vi.mock('next-i18n-router/client', () => ({
  useCurrentLocale: vi.fn(() => 'fr'),
}))

// Mock useLocale
vi.mock('@/hooks/useLocale', () => ({
  useLocale: vi.fn(() => 'fr'),
}))

// Mock TransClient
vi.mock('@/components/translation/trans/TransClient', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}))

// Mock TransServer
vi.mock('@/components/translation/trans/TransServer', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}))

// Mock react-i18next
vi.mock('react-i18next', () => ({
  initReactI18next: {
    type: 'i18next',
    init: () => {},
  },
  useTranslation: vi.fn(() => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  }),
  Trans: (children: React.ReactNode) => children,
}))

// Mock getServerTranslation
vi.mock('@/helpers/getServerTranslation', () => ({
  getServerTranslation: vi.fn().mockResolvedValue({
    t: (key: string) => key,
  }),
}))

// Mock useClientTranslation
vi.mock('@/hooks/useClientTranslation', () => ({
  useClientTranslation: vi.fn().mockReturnValue({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn(),
  })),
  usePathname: vi.fn(() => ''),
}))

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(() => faker.string.uuid()),
}))

// Mock Sentry
vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}))

// Setup MSW
beforeAll(() => {
  mswServer.listen({
    onUnhandledRequest(_, print) {
      print.warning()
    },
  })
})

afterEach(() => {
  mswServer.resetHandlers()
})

afterAll(() => {
  mswServer.close()
})
