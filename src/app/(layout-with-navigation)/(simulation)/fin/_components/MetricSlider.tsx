import CarboneTotalChart from '@/components/fin/CarboneTotalChart'
import DirectWaterTotalChart from '@/components/fin/DirectWaterTotalChart'
import { metrics } from '@/constants/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { twMerge } from 'tailwind-merge'

export default function MetricSlider() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div className="slider-mask -mx-4 w-screen overflow-hidden lg:mx-0 lg:w-full">
      <div className="px-4 lg:px-0">
        <Slider
          initialSlide={metrics.indexOf(currentMetric)}
          dots={true}
          infinite={false}
          className="mx-auto w-full lg:w-[698px]"
          beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
          <div
            className={twMerge(
              'slick-current:opacity-100 flex h-full w-full flex-col rounded-xl border-2 border-primary-50 bg-gray-100 px-4 pt-2 transition-opacity duration-500 lg:pt-20',
              currentMetric === 'carbone' ? 'opacity-100' : 'lg:opacity-60'
            )}>
            <CarboneTotalChart />
          </div>
          <div
            className={twMerge(
              'slick-current:opacity-100 flex h-full w-full flex-col rounded-xl border-2 border-primary-50 bg-gray-100 pt-10 transition-opacity duration-500 lg:pt-20',
              currentMetric === 'eau' ? 'opacity-100' : 'lg:opacity-60'
            )}>
            <DirectWaterTotalChart />
          </div>
        </Slider>
      </div>
    </div>
  )
}
