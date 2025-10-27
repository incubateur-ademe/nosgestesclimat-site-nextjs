import HeaderServer from '@/components/layout/HeaderServer'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params,
}: PropsWithChildren & DefaultPageProps) {
  const { locale } = await params
  return (
    <>
      <HeaderServer locale={locale} isSticky />

      {children}
    </>
  )
}
