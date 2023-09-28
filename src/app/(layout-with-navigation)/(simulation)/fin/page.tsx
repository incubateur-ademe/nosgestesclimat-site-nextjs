'use client'

import IframeDataShareModal from '@/components/iframe/IframeDataShareModal'
import NorthStarBanner from '@/components/northstar/NorthstarBanner'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import useQueryParams from '@/hooks/useQueryParams'
import { FormProvider } from '@/publicodes-state'
import Slider from 'react-slick'
import Actions from './_components/Actions'
import GridChart from './_components/GridChart'
import { NewsletterForm } from './_components/NewsletterForm'
import Slide from './_components/Slide'
import TotalVsTarget from './_components/TotalVsTarget'
import './slick.css'

type Diapo = 'bilan' | 'categories' | 'actions'

const diapoList = ['bilan', 'categories', 'actions']
export default function Fin({ searchParams }: any) {
  const diapo: Diapo = searchParams.diapo || 'bilan'

  const { setQueryParams } = useQueryParams()

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
        slidesToShow={1}
        dots={true}
        infinite={true}
        adaptiveHeight={true}
        className={`mb-4 md:mx-16`}
        initialSlide={diapoList.indexOf(diapo)}
        // NOTE: afterChange is broken when adaptiveHeight is set to true. See:
        // https://github.com/akiran/react-slick/issues/1262. Therefoe this hacky solution.
        beforeChange={(prevSlide, nextSlide) => {
          setTimeout(() => setQueryParams({ diapo: diapoList[nextSlide] }), 500)
        }}>
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
