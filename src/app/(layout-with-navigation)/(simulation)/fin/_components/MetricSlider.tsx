import TotalChart from '@/components/fin/TotalChart'
import { Metric } from '@/publicodes-state/types'
import { Carousel } from 'nuka-carousel'

type Props = {
  currentMetric: Metric
}

export default function MetricSlider({ currentMetric }: Props) {
  console.log(currentMetric)
  return (
    <Carousel showDots className=" mx-auto md:w-[672px]">
      <div className="w-full rounded-xl border-2 border-green-500 p-4">
        <TotalChart />
      </div>
      <div className="w-full rounded-xl border-2 border-red-500 p-24">
        <TotalChart />
      </div>
    </Carousel>
  )
}
