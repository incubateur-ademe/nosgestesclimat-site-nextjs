import FormProvider from '@/publicodes-state/formProvider'
import { PropsWithChildren } from 'react'

export default function SimulateurLayout({
  children,
  params,
}: PropsWithChildren<{ params: { root: string } }>) {
  return (
    <FormProvider
      root={params.root}
      categoryOrder={[
        'transport',
        'alimentation',
        'logement',
        'divers',
        'services sociétaux',
      ]}>
      {children}
    </FormProvider>
  )
}
