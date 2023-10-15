import FormProvider from '@/publicodes-state/formProvider/Provider'
import { PropsWithChildren } from 'react'

export default async function SimulateurLayout({
  children,
}: PropsWithChildren) {
  return <FormProvider>{children}</FormProvider>
}
