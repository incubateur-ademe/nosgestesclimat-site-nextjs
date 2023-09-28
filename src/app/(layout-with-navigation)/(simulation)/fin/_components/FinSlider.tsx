'use client'

import useQueryParams from '@/hooks/useQueryParams'
import { Diapo } from '@/types/fin'
import Slider from 'react-slick'
import Actions from './Actions'
import GridChart from './GridChart'
import Slide from './Slide'
import TotalVsTarget from './TotalVsTarget'

const DIAPO_LIST = ['bilan', 'categories', 'actions']

export default function FinSlider({
  searchParams,
}: {
  searchParams: Record<string, Diapo>
}) {
  const diapo: Diapo = searchParams.diapo || 'bilan'

  const { setQueryParams } = useQueryParams()

  return (
    <Slider
      slidesToShow={1}
      dots={true}
      infinite={true}
      adaptiveHeight={true}
      className={`mb-4 md:mx-16`}
      initialSlide={DIAPO_LIST.indexOf(diapo)}
      // NOTE: afterChange is broken when adaptiveHeight is set to true. See:
      // https://github.com/akiran/react-slick/issues/1262. Therefoe this hacky solution.
      beforeChange={(prevSlide, nextSlide) => {
        setTimeout(() => setQueryParams({ diapo: DIAPO_LIST[nextSlide] }), 500)
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
  )
}
