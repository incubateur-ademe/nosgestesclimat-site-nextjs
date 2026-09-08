import LanguageSwitchButton from '@/components/translation/LanguageSwitchButton'
import { updateLangCookie } from '@/helpers/language/updateLangCookie'
import { renderWithWrapper } from '@/helpers/tests/wrapper'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useCurrentLocale } from 'next-i18n-router/client'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// next/link needs a router context in tests; render plain anchors instead,
// preventing jsdom from attempting a real navigation on click
vi.mock('next/link', () => ({
  default: ({
    children,
    onClick,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    children?: ReactNode
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- test helper replacing next/link
    <a
      {...props}
      onClick={(event) => {
        event.preventDefault()
        onClick?.(event)
      }}>
      {children}
    </a>
  ),
}))

// The language paths are normally read from the DOM hreflang tags
vi.mock('@/hooks/useAlternateLanguagePaths', () => ({
  useAlternateLanguagePaths: vi.fn(() => ({ fr: '/fr', en: '/en' })),
}))

vi.mock('@/constants/tracking/posthogTrackers', () => ({
  captureClickLanguage: ({ locale }: { locale: string }) => ({ locale }),
}))

vi.mock('@/helpers/language/updateLangCookie', () => ({
  updateLangCookie: vi.fn(),
}))

vi.mock('@/utils/analytics/trackEvent', () => ({
  trackMatomoEvent__deprecated: vi.fn(),
  trackPosthogEvent: vi.fn(),
}))

describe('LanguageSwitchButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders a trigger showing the current language (defaults to FR)', () => {
    renderWithWrapper(<LanguageSwitchButton />)

    const trigger = screen.getByTestId('language-switch-button')
    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('FR')
    expect(trigger).not.toHaveTextContent('EN')
  })

  it('allows to change language from the default to EN', async () => {
    const user = userEvent.setup()
    renderWithWrapper(<LanguageSwitchButton />)

    const trigger = screen.getByTestId('language-switch-button')

    expect(trigger).toBeInTheDocument()
    expect(trigger).toHaveTextContent('FR')

    await user.click(screen.getByTestId('language-switch-button'))
    await user.click(screen.getByTestId('language-switch-button-en'))

    expect(updateLangCookie).toHaveBeenCalledWith('en')
  })

  it('shows the English language as current when the locale is en', () => {
    vi.mocked(useCurrentLocale).mockReturnValueOnce('en')

    renderWithWrapper(<LanguageSwitchButton />)

    const trigger = screen.getByTestId('language-switch-button')
    expect(trigger).toHaveTextContent('EN')
  })
})
