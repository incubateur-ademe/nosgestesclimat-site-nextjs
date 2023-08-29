import { PropsWithChildren } from 'react'
import Logo from '../Logo'
import Navigation from './pageLayout/Navigation'

const pageWithMenuClassnames = 'flex justify-start'
const pageWithoutMenuClassnames = ''

export default function PageLayout({
  children,
  shouldShowMenu,
}: PropsWithChildren<{ shouldShowMenu?: boolean }>) {
  return (
    <>
      {!shouldShowMenu && <Logo />}
      <div
        className={`m-auto max-w-7xl ${
          shouldShowMenu ? pageWithMenuClassnames : pageWithoutMenuClassnames
        }`}>
        {shouldShowMenu && <Navigation />}
        <div className="w-full">{children}</div>
      </div>
    </>
  )
}
