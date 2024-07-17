import CarboneTotalChart from '@/components/fin/CarboneTotalChart'
import WaterTotalChart from '@/components/fin/WaterTotalChart'
import { metrics } from '@/constants/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { twMerge } from 'tailwind-merge'
import Heading from './metricSlider/Heading'

export default function MetricSlider() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  const sliderRef = useRef<any>(null)

  return (
    <div className="slider-mask -mx-4 w-screen overflow-hidden lg:mx-0 lg:w-full">
      <div className="px-4 lg:px-0">
        <Slider
          ref={sliderRef}
          initialSlide={metrics.indexOf(currentMetric)}
          dots={true}
          infinite={false}
          className="mx-auto w-full lg:max-w-3xl"
          beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
          <button
            className={twMerge(
              '!flex h-full flex-col overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pb-4 text-left duration-500',
              currentMetric === 'carbone' && ' cursor-default'
            )}
            onClick={() => {
              if (currentMetric !== 'carbone') {
                sliderRef?.current?.slickGoTo(0)
              }
            }}>
            <Heading metric="carbone" />
            <div className="h-full w-full px-4">
              <CarboneTotalChart />
            </div>
          </button>
          <button
            className={twMerge(
              '!flex h-full flex-col overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 text-left duration-500',
              currentMetric === 'eau' && ' cursor-default'
            )}
            onClick={() => {
              console.log('currentMetric', currentMetric)
              if (currentMetric !== 'eau') {
                sliderRef?.current?.slickGoTo(1)
              }
            }}>
            <Heading metric="eau" />

            <WaterTotalChart />
          </button>
        </Slider>
      </div>
    </div>
  )
}
