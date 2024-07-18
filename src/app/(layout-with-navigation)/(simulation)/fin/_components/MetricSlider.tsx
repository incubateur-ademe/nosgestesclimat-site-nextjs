import CarboneTotalChart from '@/components/fin/CarboneTotalChart'
import WaterTotalChart from '@/components/fin/WaterTotalChart'
import { metrics } from '@/constants/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { twMerge } from 'tailwind-merge'
import DesktopTabNavigation from './metricSlider/DesktopTabNavigation'
import SliderMobileHeading from './metricSlider/SliderMobileHeading'

export default function MetricSlider() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const sliderRef = useRef<Slider>(null)
  useEffect(() => {
    sliderRef?.current?.slickGoTo(metrics.indexOf(currentMetric))
  }, [currentMetric])

  return (
    <div className="-mx-4 -mb-8 w-screen overflow-hidden lg:m-0 lg:w-full">
      <DesktopTabNavigation />
      <div className="px-4 lg:-mt-0.5 lg:px-0">
        <Slider
          ref={sliderRef}
          className="mx-auto w-full lg:rounded-b-xl lg:rounded-tr-xl lg:border-2 lg:border-primary-50 lg:bg-gray-100"
          initialSlide={metrics.indexOf(currentMetric)}
          fade={true}
          infinite={false}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                fade: false,
                dots: true,
              },
            },
          ]}
          beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
          <button
            className={twMerge(
              'relative !flex h-full flex-col rounded-xl border-2 border-primary-50 bg-gray-100 text-left lg:border-none lg:bg-transparent',
              currentMetric === 'carbone' && ' cursor-default'
            )}
            onClick={() => {
              if (currentMetric !== 'carbone') {
                sliderRef?.current?.slickGoTo(0)
              }
            }}>
            <SliderMobileHeading metric="carbone" />
            <div className="h-full w-full px-4">
              <CarboneTotalChart />
            </div>
          </button>
          <button
            className={twMerge(
              'relative !flex h-full flex-col rounded-xl border-2 border-primary-50 bg-gray-100 text-left  lg:border-none lg:bg-transparent',
              currentMetric === 'eau' && ' cursor-default'
            )}
            onClick={() => {
              console.log('currentMetric', currentMetric)
              if (currentMetric !== 'eau') {
                sliderRef?.current?.slickGoTo(1)
              }
            }}>
            <SliderMobileHeading metric="eau" />

            <WaterTotalChart />
          </button>
        </Slider>
      </div>
    </div>
  )
}
