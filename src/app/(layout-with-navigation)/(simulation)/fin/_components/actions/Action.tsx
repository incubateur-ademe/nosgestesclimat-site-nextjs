import Trans from '@/components/translation/Trans'
import formatCarbonFootprint from '@/helpers/formatCarbonFootprint'
import { useRule } from '@/publicodes-state'

type Props = {
  action: string
}

export default function Action({ action }: Props) {
  const { numericValue: total } = useRule('bilan')

  const { title, icons, color, numericValue } = useRule(action)

  const relativeValue = Math.abs(Math.round(100 * (numericValue / total)))

  const { formattedValue, unit } = formatCarbonFootprint(numericValue)

  return (
    <div
      className="rounded-lg p-4 text-white md:px-12"
      style={{ backgroundColor: color }}>
      <div className="mb-4 flex items-center gap-4 border-b border-white pb-2 md:gap-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          {icons}
        </div>{' '}
        <div className="flex-1  text-lg font-bold md:text-xl">{title}</div>
      </div>
      <div className="flex justify-center">
        <div
          className={`border-primary-500 bg-primary-500 inline-block rounded border-2 border-solid pl-2 pr-[2px] text-white `}>
          <span>
            -&nbsp;
            <strong>{formattedValue}</strong>&nbsp;
            <span>
              <Trans>{unit}</Trans>
            </span>
          </span>
          {total && relativeValue > 0 && (
            <span className="text-primary-700 bg-primary-100 ml-2 rounded-e-sm px-1">
              {relativeValue}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
