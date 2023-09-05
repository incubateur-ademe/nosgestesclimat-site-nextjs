'use client'

import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
import Slider from 'react-slick'
import Subcategories from './_components/Subcategories'
import TotalVsTarget from './_components/TotalVsTarget'
import './slick.css'

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
      <Slider dots={true} infinite={true} className="mb-4 mx-16">
        <TotalVsTarget />
        <div>2</div>
      </Slider>
      <Subcategories />
    </FormProvider>
  )
}
