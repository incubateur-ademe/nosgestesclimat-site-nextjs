import Footer from '@/components/layout/Footer'
import HeaderServer from '@/components/layout/HeaderServer'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  if (!(await isUserAuthenticated())) {
    redirect('/connexion')
  }
  return (
    <>
      <HeaderServer isSticky />

      {children}

      <Footer className="mt-16" />
    </>
  )
}
