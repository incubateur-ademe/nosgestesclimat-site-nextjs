import HeaderServer from '@/components/layout/HeaderServer'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import { getAuthentifiedUser } from '@/helpers/authentication/getAuthentifiedUser'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  const authenticatedUser = await getAuthentifiedUser()

  if (authenticatedUser) {
    redirect(MON_ESPACE_PATH)
  }

  return (
    <>
      <HeaderServer />

      {children}
    </>
  )
}
