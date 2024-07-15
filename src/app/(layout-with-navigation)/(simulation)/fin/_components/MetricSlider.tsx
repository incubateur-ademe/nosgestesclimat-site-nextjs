import CarboneTotalChart from '@/components/fin/CarboneTotalChart'
import DirectWaterTotalChart from '@/components/fin/DirectWaterTotalChart'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { Metric } from '@/publicodes-state/types'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

const metrics: Metric[] = ['eau', 'carbone']

export default function MetricSlider() {
  const { currentMetric, setCurrentMetric } = useCurrentMetric()

  return (
    <div>
      <Slider
        initialSlide={metrics.indexOf(currentMetric)}
        dots={true}
        infinite={true}
        className="mx-auto w-[672px]"
        beforeChange={(_, nextSlide) => setCurrentMetric(metrics[nextSlide])}>
        <div className="h-full w-full overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 pt-20">
          <DirectWaterTotalChart />
        </div>
        <div className="h-full w-full overflow-hidden rounded-xl border-2 border-primary-50 bg-gray-100 px-4 py-24">
          <CarboneTotalChart />
        </div>
      </Slider>
    </div>
  )
}
