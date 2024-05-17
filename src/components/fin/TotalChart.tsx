'use client'

import Gauge from './totalChart/Gauge'
import TargetNumber from './totalChart/TargetNumber'
import TotalNumber from './totalChart/TotalNumber'

type Props = {
  total?: number
}
export default function TotalChart({ total }: Props) {
  return (
    <div className="relative mx-auto mb-14 mt-36 w-full md:w-[640px] lg:mb-2">
      <TotalNumber total={total} />
      <Gauge />
      {!total ? <TargetNumber /> : null}
    </div>
  )
}
