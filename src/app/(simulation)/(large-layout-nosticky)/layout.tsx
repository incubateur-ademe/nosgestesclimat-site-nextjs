import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <FormProvider>{children}</FormProvider>
}
