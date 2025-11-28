import HeaderServer from '@/components/layout/HeaderServer'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import { isUserAuthenticated } from '@/helpers/server/model/user'

import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  if (await isUserAuthenticated()) {
    redirect(MON_ESPACE_PATH)
  }

  return (
    <>
      <HeaderServer />

      {children}
    </>
  )
}
