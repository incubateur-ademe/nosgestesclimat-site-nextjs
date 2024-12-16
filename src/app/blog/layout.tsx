import Header from '@/components/layout/Header'
import Main from '@/design-system/layout/Main'
import type { PropsWithChildren } from 'react'

export default async function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  )
}
