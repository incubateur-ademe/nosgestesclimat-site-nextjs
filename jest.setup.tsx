import { afterAll, beforeAll } from '@jest/globals'
import type { ReactNode } from 'react'
import { mswServer } from './src/__tests__/server'

jest.mock('next-i18n-router/client', () => ({
  useCurrentLocale: () => 'fr',
}))

jest.mock('@/hooks/useLocale', () => ({
  useLocale: () => 'fr',
}))

jest.mock('@/components/translation/trans/TransClient', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/components/translation/trans/TransServer', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('react-i18next', () => ({
  initReactI18next: {
    type: 'i18next',
    init: () => {},
  },
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  Trans: (children: ReactNode) => children,
}))

jest.mock('@/helpers/getServerTranslation', () => ({
  getServerTranslation: jest.fn().mockResolvedValue({
    t: (key: string) => key,
  }),
}))

jest.mock('@/hooks/useClientTranslation', () => ({
  useClientTranslation: jest.fn().mockReturnValue({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}))

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
  usePathname: () => '',
}))

jest.mock('uuid', () => ({
  v4: () => 'test-uuid-1234',
}))

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
