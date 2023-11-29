import { FormProvider } from '@/publicodes-state'
import { PropsWithChildren } from 'react'

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  return <FormProvider>{children}</FormProvider>
}
