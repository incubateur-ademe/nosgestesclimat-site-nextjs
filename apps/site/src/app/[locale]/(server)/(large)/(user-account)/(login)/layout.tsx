import type { DefaultPageProps } from '@/types'
import type { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren & DefaultPageProps

export default function Layout({ children }: LayoutProps) {
  return <div className="-mt-6">{children}</div>
}
