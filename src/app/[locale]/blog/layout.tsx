import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header isSticky={false} />

      <main className="flex w-full flex-1 flex-col overflow-visible lg:mx-auto lg:px-0">
        {children}
      </main>
    </>
  )
}
