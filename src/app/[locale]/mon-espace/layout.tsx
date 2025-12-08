import Footer from '@/components/layout/Footer'
import HeaderServer from '@/components/layout/HeaderServer'
import { ServerLayout } from '@/components/layout/ServerLayout'
import { isUserAuthenticated } from '@/helpers/server/model/user'
import type { Locale } from '@/i18nConfig'
import { redirect } from 'next/navigation'

/* global LayoutProps */
export default async function Layout({
  children,
  params,
}: LayoutProps<'/[locale]/mon-espace'>) {
  const { locale } = await params

  if (!(await isUserAuthenticated())) {
    redirect('/connexion')
  }
  return (
    <ServerLayout locale={locale as Locale}>
      <HeaderServer isSticky />

      {children}

      <Footer className="mt-16" />
    </ServerLayout>
  )
}
