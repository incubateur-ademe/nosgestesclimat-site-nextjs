import { orderedCategories } from '@/constants/orderedCategories'
import FormProvider from '@/publicodes-state/formProvider'
import { PropsWithChildren } from 'react'

export default function Layout({
  params,
  children,
}: PropsWithChildren<{ params: { root: string } }>) {
  return (
    <FormProvider root={params.root} categoryOrder={orderedCategories}>
      {children}
    </FormProvider>
  )
}
