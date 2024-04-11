import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { roundValue } from '@/utils/roundValue'
import { formatValue } from 'publicodes'

type Props = {
  subcategory: string
  categoryValue: number
}

export default function SubcategoryListItem({
  subcategory,
  categoryValue,
}: Props) {
  const { numericValue, title, icons } = useRule(subcategory)

  const formattedValue = formatValue(numericValue, { precision: 0 })

  if (formattedValue === '0') return null

  const percentageOfCategoryValue =
    1 - (categoryValue - numericValue) / categoryValue

  return (
    <li className="p-3">
      <div className="flex items-baseline gap-4">
        {/* @bjlaa: flex w-4 is required here because of a bug of react-easy-emoji that creates a duplicate empty element */}
        <Emoji className="flex w-4">{icons}</Emoji>

        <div className="w-full">
          <div className="flex items-center justify-between text-sm md:text-base">
            <p className="mb-0">{title}</p>

            <div className="text-primary-700">
              <strong>
                {formatValue(roundValue(numericValue), { precision: 0 })}
              </strong>{' '}
              kg
            </div>
          </div>
          <div className="mt-2">
            <div>
              <div
                className="h-[6px] rounded-xl bg-primary-700"
                style={{
                  width: `calc(${percentageOfCategoryValue} * 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
