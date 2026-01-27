import CookieConsentBannerAndManagement from '@/components/cookies/CookieConsentBannerAndManagement'
import { CookieConsentProvider } from '@/components/cookies/CookieConsentProvider'
import { GoogleTagIframe } from '@/components/googleTagManager/GoogleTagIframe'
import { GoogleTagScript } from '@/components/googleTagManager/GoogleTagScript'
import HeaderServer from '@/components/layout/HeaderServer'
import SkipToMainContentLink from '@/design-system/accessibility/SkipToMainContentLink'
import Banner from '@/design-system/cms/Banner'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function LargeLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  return (
    <>
      <CookieConsentProvider>
        <SkipToMainContentLink />
        <CookieConsentBannerAndManagement />
        <Banner locale={locale} />
        <HeaderServer locale={locale} />
        {children}

        <GoogleTagScript />
        <GoogleTagIframe />
      </CookieConsentProvider>
    </>
  )
}
