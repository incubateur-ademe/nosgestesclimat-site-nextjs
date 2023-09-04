'use client'

import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
import Subcategories from './_components/Subcategories'

export default function Fin() {
  return (
    <FormProvider
      root={'bilan'}
      categoryOrder={[
        'transport',
        'alimentation',
        'logement',
        'divers',
        'services sociétaux',
      ]}>
      <Title title={'Votre bilan climat personnel'} />
      <Subcategories />
    </FormProvider>
  )
}
