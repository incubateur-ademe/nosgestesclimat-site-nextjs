import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import Footer from '@/components/layout/Footer'

export default async function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex max-w-7xl justify-start">
        <Main className="mx-4 my-8 w-full max-w-5xl lg:mx-auto">
          {children}
        </Main>
      </div>
      <Footer />
    </>
  )
}
