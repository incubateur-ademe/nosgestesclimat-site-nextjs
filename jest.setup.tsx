import type { ReactNode } from 'react'

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
