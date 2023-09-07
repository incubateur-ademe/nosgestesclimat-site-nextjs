import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import Total from '@/components/total/Total'
import TransServer from '@/components/translation/TransServer'
import { orderedCategories } from '@/constants/orderedCategories'
import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
import { PropsWithChildren } from 'react'

export default function ActionsLayout({ children }: PropsWithChildren) {
  return (
    <FormProvider root={'bilan'} categoryOrder={orderedCategories}>
      <Title title={<TransServer>Agir</TransServer>} />
      <Total />
      <NorthStarBanner type="action" />
      <div>{children}</div>
    </FormProvider>
  )
}
