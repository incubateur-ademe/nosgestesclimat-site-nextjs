import CarboneTotalChart from '@/components/fin/CarboneTotalChart'
import DirectWaterTotalChart from '@/components/fin/DirectWaterTotalChart'
import { metrics } from '@/constants/metric'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

export default function MetricSlider() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div className="-mx-4 w-full">
      <Slider
        initialSlide={metrics.indexOf(currentMetric)}
        dots={true}
        infinite={true}
        className="mx-auto w-full lg:w-[672px]"
        beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
        <div className="h-full w-full overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-24">
          <CarboneTotalChart />
        </div>
        <div className="h-full w-full overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pt-20">
          <DirectWaterTotalChart />
        </div>
      </Slider>
    </div>
  )
}
