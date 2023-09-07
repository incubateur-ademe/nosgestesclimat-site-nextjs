'use client'

import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import { orderedCategories } from '@/constants/orderedCategories'
import Title from '@/design-system/layout/Title'
import FormProvider from '@/publicodes-state/formProvider'
import Slider from 'react-slick'
import Actions from './_components/Actions'
import GridChart from './_components/GridChart'
import { NewsletterForm } from './_components/NewsletterForm'
import TotalVsTarget from './_components/TotalVsTarget'
import './slick.css'

export default function Fin() {
  return (
    <FormProvider root={'bilan'} categoryOrder={orderedCategories}>
      <NorthStarBanner type="learned" />
      <Title title={'Votre bilan climat personnel'} />
      <Slider dots={true} infinite={true} className="mx-16 mb-4">
        <Actions />
        <TotalVsTarget />
        <GridChart />
      </Slider>
      <NewsletterForm />
    </FormProvider>
  )
}
