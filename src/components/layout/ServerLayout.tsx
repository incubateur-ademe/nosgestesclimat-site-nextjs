import { marianne } from '@/app/[locale]/layout'
import CookieConsentBannerAndManagement from '@/components/cookies/CookieConsentBannerAndManagement'
import { GoogleTagIframe } from '@/components/googleTagManager/GoogleTagIframe'
import { GoogleTagScript } from '@/components/googleTagManager/GoogleTagScript'
import SkipToMainContentLink from '@/design-system/accessibility/SkipToMainContentLink'
import Banner from '@/design-system/cms/Banner'
import type { Locale } from '@/i18nConfig'
import type { PropsWithChildren } from 'react'

type RootLayoutProps = PropsWithChildren & {
  locale: Locale
}

export const ServerLayout = ({ children, locale }: RootLayoutProps) => (
  <body className={marianne.className}>
    <SkipToMainContentLink />

    <CookieConsentBannerAndManagement />

    <Banner locale={locale} />

    {children}

    <GoogleTagScript />
    <GoogleTagIframe />
  </body>
)
