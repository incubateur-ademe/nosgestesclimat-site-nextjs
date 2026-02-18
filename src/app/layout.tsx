import CookieConsent from '@/components/cookies/CookieConsent'
import { CookieConsentProvider } from '@/components/cookies/useCookieManagement'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CookieConsentProvider>
      <CookieConsent />
      {children}
    </CookieConsentProvider>
  )
}
