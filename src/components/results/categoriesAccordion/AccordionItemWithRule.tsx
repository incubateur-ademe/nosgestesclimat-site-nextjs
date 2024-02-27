import HorizontalBarChartItem from '@/components/charts/HorizontalBarChartItem'
import Trans from '@/components/translation/Trans'
import Card from '@/design-system/layout/Card'
import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
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

  const percentageOfTotalValue = (numericValue / maxValue) * 100

  return (
    <AccordionItem
      title={
        <HorizontalBarChartItem
          percentageOfTotalValue={percentageOfTotalValue}
          index={index}
          title={title}
          icons={icons}
          displayValue={
            <span>
              <strong>
                {formatValue(numericValue / 1000, { precision: 1 })}
              </strong>{' '}
              <Trans>tonnes</Trans>
            </span>
          }
        />
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
