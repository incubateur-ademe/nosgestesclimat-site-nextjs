'use client'

import Gauge from './totalChart/Gauge'
import TargetNumber from './totalChart/TargetNumber'
import TotalNumber from './totalChart/TotalNumber'

export default function TotalChart() {
  return (
    <div className="relative mx-auto mb-10 mt-40 w-full md:w-[640px] lg:mb-2">
      <TotalNumber />
      <Gauge />
      <TargetNumber />
    </div>
  )
}
