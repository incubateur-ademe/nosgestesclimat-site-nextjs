import HeaderServer from '@/components/layout/HeaderServer'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../_components/ClientLayout'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function BlogLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  return (
    <ClientLayout locale={locale}>
      <HeaderServer locale={locale} isSticky={false} />

      <main className="flex w-full flex-1 flex-col overflow-visible lg:mx-auto lg:px-0">
        {children}
      </main>
    </ClientLayout>
  )
}
