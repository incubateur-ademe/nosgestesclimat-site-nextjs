'use client'

import TargetNumber from './totalChart/TargetNumber'
import TotalNumber from './totalChart/TotalNumber'

export default function TotalChart() {
  return (
    <div className="relative mx-auto mb-10 mt-40 w-full md:w-[640px] lg:mb-2">
      <TotalNumber />
      <div className="bg-total-chart relative h-12 w-full rounded-full border-2 border-primary-50">
        <div className="absolute bottom-full left-0 text-xs">0</div>
        <div className="absolute bottom-full right-0 text-xs">12</div>
      </div>
      <TargetNumber />
    </div>
  )
}
