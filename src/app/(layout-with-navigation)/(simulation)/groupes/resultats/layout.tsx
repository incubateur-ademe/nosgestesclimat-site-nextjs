import FormProvider from '@/publicodes-state/formProvider'
import { PropsWithChildren } from 'react'

export default function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { root: string } }>) {
  return <FormProvider root={params.root}>{children}</FormProvider>
}
