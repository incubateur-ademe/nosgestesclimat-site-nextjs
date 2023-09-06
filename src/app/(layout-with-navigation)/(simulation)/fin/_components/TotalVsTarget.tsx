import { useRule } from '@/publicodes-state'
import tinygradient from 'tinygradient'
import Target from './totalVsTarget/Target'
import Total from './totalVsTarget/Total'

const gradient = tinygradient([
    '#78e08f',
    '#e1d738',
    '#f6b93b',
    '#b71540',
    '#000000',
  ]),
  colors = gradient.rgb(20)

const getBackgroundColor = (score: number) =>
  colors[
    Math.round((score < 2000 ? 0 : score > 20000 ? 19000 : score - 2000) / 1000)
  ]

export default function TotalVsTarget() {
  const { value: total } = useRule('bilan')

  const backgroundColor = getBackgroundColor(total).toHexString()
  const backgroundColor2 = getBackgroundColor(total + 2000).toHexString()

  return (
    <div
      className="py-12 px-36 bg-primaryLight rounded-lg"
      style={{
        background: `linear-gradient(
      180deg,
      ${backgroundColor} 0%,
      ${backgroundColor2} 100%
    )`,
      }}>
      <div className="mt-12 flex items-end justify-around border-b-4 border-primary h-[36rem]">
        <Total total={total} />
        <Target total={total} />
      </div>
    </div>
  )
}
