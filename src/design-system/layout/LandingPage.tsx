import Header from '@/components/layout/Header'
import { ReactNode } from 'react'
import Main from './Main'
import Hero from './landingPage/Hero'

export default function LandingPage({
  heroContent,
  heroIllustration,
  heroPartners,
  children,
}: {
  heroContent: ReactNode
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
          content={heroContent}
          partners={heroPartners}
        />

        {children}
      </Main>
    </>
  )
}
