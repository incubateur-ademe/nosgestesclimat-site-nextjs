'use client'

import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
<<<<<<< HEAD
import Slider from 'react-slick'
import GridChart from './_components/GridChart'
import { NewsletterForm } from './_components/NewsletterForm'
import TotalVsTarget from './_components/TotalVsTarget'
import './slick.css'
=======
import Subcategories from './_components/Subcategories'
>>>>>>> main

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
<<<<<<< HEAD
      <Slider dots={true} infinite={true} className="mb-4 mx-16">
        <GridChart />
        <TotalVsTarget />
      </Slider>
      <NewsletterForm />
=======
      <Subcategories />
>>>>>>> main
    </FormProvider>
  )
}
