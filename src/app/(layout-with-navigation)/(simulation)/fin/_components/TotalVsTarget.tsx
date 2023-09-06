import { useRule } from '@/publicodes-state'
import Target from './totalVsTarget/Target'
import Total from './totalVsTarget/Total'

export default function TotalVsTarget() {
  const { value: total } = useRule('bilan')

  return (
    <div className="py-12 px-36 bg-primaryLight rounded-lg">
      <div className="mt-12 flex items-end justify-around border-b-4 border-primary h-[36rem]">
        <Total total={total} />
        <Target total={total} />
      </div>
    </div>
  )
}
