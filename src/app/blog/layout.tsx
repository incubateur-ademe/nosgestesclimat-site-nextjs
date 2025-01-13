import Header from '@/components/layout/Header'
import type { PropsWithChildren } from 'react'

export default async function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header isSticky={false} />

      <main className="flex w-full max-w-5xl flex-1 flex-col overflow-visible px-4 lg:mx-auto lg:px-0">
        {children}
      </main>
    </>
  )
}
