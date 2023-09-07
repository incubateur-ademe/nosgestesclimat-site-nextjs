import TransClient from '@/components/translation/TransClient'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'

type Props = {
  action: string
}

export default function Action({ action }: Props) {
  const { value: total } = useRule('bilan')

  const { title, icons, color, value } = useRule(action)

  const relativeValue = Math.abs(Math.round(100 * (value / total)))

  const { formattedValue, unit } = formatCarbonFootprint(value)
  return (
    <div
      className="rounded-lg px-12 py-4 text-white"
      style={{ backgroundColor: color }}>
      <div className="mb-4 flex items-center gap-12 border-b border-white pb-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          {icons}
        </div>{' '}
        <div className="text-xl font-bold">{title}</div>
      </div>
      <div className="flex justify-center">
        <div
          className={`inline-block rounded border-2 border-solid border-primary bg-primary pl-2 pr-[2px] text-white `}>
          <span>
            -&nbsp;
            <strong>{formattedValue}</strong>&nbsp;
            <span>
              <TransClient>{unit}</TransClient>
            </span>
          </span>
          {total && relativeValue > 0 && (
            <span className="ml-2 rounded-e-sm bg-primaryLight px-1 text-primaryDark">
              {relativeValue}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
