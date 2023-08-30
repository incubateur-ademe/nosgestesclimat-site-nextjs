import PageLayout from '@/components/layout/PageLayout'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <PageLayout shouldShowMenu>{children}</PageLayout>
}
