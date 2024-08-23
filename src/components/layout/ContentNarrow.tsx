import Main from '@/design-system/layout/Main'
import { PropsWithChildren } from 'react'

export default function ContentNarrow({ children }: PropsWithChildren) {
  return (
    <Main className="mb-8 w-full max-w-4xl overflow-visible px-4 lg:mx-auto">
      {children}
    </Main>
  )
}
