import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import Footer from '@/components/layout/Footer'

export default async function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex max-w-7xl justify-start">
        <Main className="w-full max-w-4xl p-4 md:mx-auto md:py-8">
          {children}
        </Main>
      </div>
      <Footer />
    </>
  )
}
