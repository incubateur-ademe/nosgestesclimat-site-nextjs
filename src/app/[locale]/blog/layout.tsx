import HeaderServer from '@/components/layout/HeaderServer'
import { ServerLayout } from '@/components/layout/ServerLayout'
import type { DefaultPageProps } from '@/types'
import { type PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function BlogLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  return (
    <ServerLayout locale={locale}>
      <HeaderServer />

      <main
        id="main-content"
        tabIndex={-1}
        className="flex w-full flex-1 flex-col overflow-visible lg:mx-auto lg:px-0">
        {children}
      </main>
    </ServerLayout>
  )
}
