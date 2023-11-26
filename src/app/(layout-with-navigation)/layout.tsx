import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

export default async function PageLayout({ children }: PropsWithChildren) {
  return (
    <Main className="w-full max-w-4xl p-4 md:mx-auto md:py-8">{children}</Main>
  )
}
