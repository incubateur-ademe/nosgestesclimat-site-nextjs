'use client'

import Gauge from './carboneTotalChart/Gauge'
import TargetNumber from './carboneTotalChart/TargetNumber'
import TotalNumber from './carboneTotalChart/TotalNumber'

type Props = {
  total?: number
}
export default function CarboneTotalChart({ total }: Props) {
  return (
    <div className="relative mx-auto mb-14 mt-36 w-full md:w-[640px] lg:mb-2">
      <TotalNumber total={total} />
      <Gauge />
      {!total ? <TargetNumber /> : null}
    </div>
  )
}
