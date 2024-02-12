import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { formatValue } from 'publicodes'
import SubcategoriesList from './accordionItemWithRule/SubcategoriesList'

export default function AccordionItemWithRule({
  dottedName,
  maxValue,
  index,
}: {
  dottedName: string
  maxValue: number
  index?: number
}) {
  const { title, icons, numericValue } = useRule(dottedName)

  const percentageOfTotalValue = numericValue / maxValue

  return (
    <AccordionItem
      title={
        <div className="flex w-full items-center gap-8">
          <div className="flex min-w-[11rem] items-center gap-2">
            <Emoji>{icons}</Emoji>{' '}
            <p
              className={`mb-0 underline decoration-dotted underline-offset-4`}>
              {title}
            </p>
          </div>
          <div className="mr-4 hidden flex-1 md:block">
            <BarChart
              type="horizontal"
              percentage={String(percentageOfTotalValue)}
              index={index}
            />
          </div>

          <div className="mr-4 text-primary-700">
            <strong>
              {formatValue(numericValue / 1000, { precision: 1 })}
            </strong>{' '}
            tonnes
          </div>
        </div>
      }
      content={
        <Card
          className="mb-4 border-x-0 bg-grey-100"
          style={{
            boxShadow: '0px 6px 6px -2px rgba(21, 3, 35, 0.05) inset',
          }}>
          <SubcategoriesList category={dottedName} />
        </Card>
      }
    />
  )
}
