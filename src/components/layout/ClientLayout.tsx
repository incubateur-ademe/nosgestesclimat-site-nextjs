import CookieConsentBannerAndManagement from '@/components/cookies/CookieConsentBannerAndManagement'
import { GoogleTagIframe } from '@/components/googleTagManager/GoogleTagIframe'
import { GoogleTagScript } from '@/components/googleTagManager/GoogleTagScript'
import SkipToMainContentLink from '@/design-system/accessibility/SkipToMainContentLink'
import Banner from '@/design-system/cms/Banner'
import type { Locale } from '@/i18nConfig'
import type { SkipLinksDisplayed } from '@/types'
import type { PropsWithChildren } from 'react'
import MainLayoutProviders from '../../app/[locale]/_components/MainLayoutProviders'

type RootLayoutProps = PropsWithChildren & {
  locale: string
  skipLinksDisplayed?: SkipLinksDisplayed
}

export const ClientLayout = ({
  children,
  skipLinksDisplayed,
  locale,
}: RootLayoutProps) => (
  <MainLayoutProviders>
    <SkipToMainContentLink skipLinksDisplayed={skipLinksDisplayed} />

    <CookieConsentBannerAndManagement />

    <Banner locale={locale as Locale} />

    {children}

    <GoogleTagScript />
    <GoogleTagIframe />
  </MainLayoutProviders>
)
