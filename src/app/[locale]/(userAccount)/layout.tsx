import HeaderServer from '@/components/layout/HeaderServer'
import { ServerLayout } from '@/components/layout/ServerLayout'
import { MON_ESPACE_PATH } from '@/constants/urls/paths'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

import { redirect } from 'next/navigation'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params

  if (await isUserAuthenticated()) {
    redirect(MON_ESPACE_PATH)
  }

  return (
    <ServerLayout locale={locale}>
      <HeaderServer />

      {children}
    </ServerLayout>
  )
}
