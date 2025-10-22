import Header from '@/components/layout/HeaderClient'
import type { ReactNode } from 'react'
import Main from './Main'
import Hero from './landingPage/Hero'

export default function LandingPage({
  heroTitle,
  heroDescription,
  heroIllustration,
  heroPartners,
  children,
}: {
  heroTitle: ReactNode
  heroDescription: ReactNode
  heroIllustration: ReactNode
  heroPartners: ReactNode
  children: ReactNode
}) {
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

        {children}
      </Main>
    </>
  )
}
