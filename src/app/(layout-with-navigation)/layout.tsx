import LocalisationBanner from '@/components/translation/LocalisationBanner'
import Main from '@/design-system/layout/Main'
import { useSupportedRegions } from '@/hooks/useSupportedRegions'
import { PropsWithChildren } from 'react'

import Footer from '@/components/layout/Footer'
import MobileHeader from './_components/MobileHeader'
import Navigation from './_components/Navigation'

export default async function PageLayout({ children }: PropsWithChildren) {
  const supportedRegions = await useSupportedRegions()

  return (
    <>
      <div className="m-auto flex max-w-7xl justify-start">
        <Navigation />
        <Main className="w-full max-w-4xl p-2 md:px-4 md:py-8">
          <MobileHeader />
          <LocalisationBanner supportedRegions={supportedRegions} />
          {children}
        </Main>
      </div>
      <Footer />
    </>
  )
}
