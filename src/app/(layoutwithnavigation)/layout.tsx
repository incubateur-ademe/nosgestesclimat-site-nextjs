import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

import Navigation from './_components/Navigation'

export default function PageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto max-w-7xl flex justify-start">
        <Navigation />
        <Main className="w-full max-w-[800px] p-8">{children}</Main>
      </div>
    </>
  )
}
