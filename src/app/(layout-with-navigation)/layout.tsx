import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import MobileHeader from './_components/MobileHeader'
import Navigation from './_components/Navigation'

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex max-w-7xl justify-start">
        <Navigation />

        <Main className="w-full max-w-4xl p-2 md:px-4 md:py-8">
          <MobileHeader />
          {children}
        </Main>
      </div>
    </>
  )
}
