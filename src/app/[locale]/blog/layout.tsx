import Header from '@/components/layout/Header'
import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../_components/ClientLayout'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function BlogLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  return (
    <ClientLayout locale={locale}>
      <Header isSticky={false} />

      <main
        id="main-content"
        tabIndex={-1}
        className="mt-2 flex w-full flex-1 flex-col overflow-visible lg:mx-auto lg:px-0">
        {children}
      </main>
    </ClientLayout>
  )
}
