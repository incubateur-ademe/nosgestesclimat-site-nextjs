import Header from '@/components/layout/HeaderClient'
import type { Locale } from '@/i18nConfig'
import type { ReactNode } from 'react'
import Main from './Main'
import DynamicCounter from './landingPage/DynamicCounter'
import Hero from './landingPage/Hero'

interface Props {
  heroTitle: ReactNode
  heroDescription: ReactNode
  heroIllustration: ReactNode
  heroPartners: ReactNode
  children: ReactNode
  locale: Locale
}

export default function LandingPage({
  heroTitle,
  heroDescription,
  heroIllustration,
  heroPartners,
  children,
  locale,
}: Props) {
  return (
    <>
      <Header />

      <Main>
        <Hero
          illustration={heroIllustration}
          title={heroTitle}
          description={heroDescription}
          partners={heroPartners}
        />

        <DynamicCounter locale={locale} />

        {children}
      </Main>
    </>
  )
}
