'use client'

import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import FormProvider from '@/publicodes-state/formProvider'
import { useState } from 'react'
import Slider from 'react-slick'
import Actions from './_components/Actions'
import GridChart from './_components/GridChart'
import { NewsletterForm } from './_components/NewsletterForm'
import Slide from './_components/Slide'
import TotalVsTarget from './_components/TotalVsTarget'
import './slick.css'

export default function Fin() {
  const [step, setStep] = useState(0)

  return (
    <FormProvider>
      <NorthStarBanner type="learned" />

      <IframeDataShareModal />

      <div className="mb-12 flex justify-start md:mx-16">
        <ButtonLink size="sm" color="secondary" href="/simulateur/bilan">
          ← Revenir au test
        </ButtonLink>
      </div>
      <Slider
        dots={true}
        infinite={true}
        className={`mb-4 h-[32rem] md:mx-16 md:h-[34rem] ${
          step === 1 ? '!h-[34rem] md:!h-[46rem]' : ''
        }
        ${step === 2 ? '!h-[44rem] md:!h-[46rem]' : ''}
        `}
        beforeChange={(currentStep, nextStep) => setStep(nextStep)}>
        <Slide noMargin className="md:h-[33rem]">
          <TotalVsTarget />
        </Slide>
        <Slide className="h-[32rem] md:h-[44rem]">
          <GridChart />
        </Slide>
        <Slide className="h-[42rem]">
          <Actions />
        </Slide>
      </Slider>
      <NewsletterForm />
    </FormProvider>
  )
}
