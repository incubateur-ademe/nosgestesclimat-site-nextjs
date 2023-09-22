import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import Footer from '@/components/layout/Footer'
import LocalisationBanner from '@/components/translation/LocalisationBanner'
import MobileHeader from './_components/MobileHeader'
import Navigation from './_components/Navigation'

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex max-w-7xl justify-start">
        <Navigation />

        <Main className="h-[calc(100vh-2rem)] w-full max-w-4xl p-2 md:px-4 md:py-8">
          <MobileHeader />

          <LocalisationBanner />

          {children}
        </Main>
      </div>
      <Footer />
    </>
  )
}
