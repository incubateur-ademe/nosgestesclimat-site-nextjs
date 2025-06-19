import Main from '@/design-system/layout/Main'
import type { PropsWithChildren } from 'react'

export default function ContentNarrow({ children }: PropsWithChildren) {
  return (
    <Main className="my-8 w-full max-w-4xl overflow-visible px-4 pb-12 lg:mx-auto">
      {children}
    </Main>
  )
}
