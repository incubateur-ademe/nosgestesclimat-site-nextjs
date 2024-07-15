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
              'slick-current:opacity-100 h-full w-full overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-24 transition-opacity duration-500',
              currentMetric === 'carbone' ? 'opacity-100' : 'opacity-80'
            )}>
            <CarboneTotalChart />
          </div>
          <div
            className={twMerge(
              'slick-current:opacity-100 h-full w-full overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pt-20 transition-opacity duration-500',
              currentMetric === 'eau' ? 'opacity-100' : 'opacity-80'
            )}>
            <DirectWaterTotalChart />
          </div>
        </Slider>
      </div>
    </div>
  )
}
