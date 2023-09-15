'use client'

import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import FormProvider from '@/publicodes-state/formProvider'
import Slider from 'react-slick'
import Actions from './_components/Actions'
import GridChart from './_components/GridChart'
import { NewsletterForm } from './_components/NewsletterForm'
import Slide from './_components/Slide'
import TotalVsTarget from './_components/TotalVsTarget'
import './slick.css'

export default function Fin() {
  return (
    <FormProvider>
      <NorthStarBanner type="learned" />
      <div className="mb-12 flex justify-start md:mx-16">
        <ButtonLink size="sm" color="secondary" href="/simulateur/bilan">
          ← Revenir au test
        </ButtonLink>
      </div>
      <Slider dots={true} infinite={true} className="mb-4 md:mx-16">
        <Slide noMargin>
          <TotalVsTarget />
        </Slide>
        <Slide>
          <GridChart />
        </Slide>
        <Slide>
          <Actions />
        </Slide>
      </Slider>
      <NewsletterForm />
    </FormProvider>
  )
}
