import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'
import { ClientLayout } from '../_components/ClientLayout'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params
  return <ClientLayout locale={locale}>{children}</ClientLayout>
}
