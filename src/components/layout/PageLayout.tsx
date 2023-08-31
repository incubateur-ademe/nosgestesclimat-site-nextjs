import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'
import Logo from '../Logo'
import Navigation from './pageLayout/Navigation'

const pageWithMenuClassnames = 'flex justify-start'
const pageWithoutMenuClassnames = ''

export default function PageLayout({
  children,
  shouldShowMenu,
  shouldLimitMainWidth = true,
}: PropsWithChildren<{
  shouldShowMenu?: boolean
  shouldLimitMainWidth?: boolean
}>) {
  return (
    <>
      {!shouldShowMenu && <Logo />}
      <div
        className={`m-auto max-w-7xl ${
          shouldShowMenu ? pageWithMenuClassnames : pageWithoutMenuClassnames
        }`}>
        {shouldShowMenu && <Navigation />}
        <Main
          className={`w-full ${
            shouldLimitMainWidth ? 'max-w-[800px] p-8' : ''
          }`}>
          {children}
        </Main>
      </div>
    </>
  )
}
