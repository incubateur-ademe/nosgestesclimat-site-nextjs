import Footer from '@/components/layout/Footer'
import Logo from '@/components/misc/Logo'
import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <header>
        <Logo />
      </header>
      <Main>
        <div className="mx-auto flex flex-col justify-center gap-4 px-4 pb-8 text-center md:mx-auto md:mt-6 md:w-full md:max-w-6xl md:p-10 md:px-8 md:text-left">
          {children}
        </div>
      </Main>
      <Footer />
    </>
  )
}
