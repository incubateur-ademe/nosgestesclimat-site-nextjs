import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
import { useRule, useSimulation } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import SubcategoriesList from './accordionItemWithRule/SubcategoriesList'

export default function AccordionItemWithRule({
  dottedName,
  maxValue,
  index,
}: {
  dottedName: DottedName
  maxValue: number
  index?: number
}) {
  const { title, icons, numericValue } = useRule(dottedName)

  const percentageOfTotalValue = numericValue / maxValue

  const { subcategories } = useSimulation()
  const isReadOnly = subcategories[dottedName]?.length === 0

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
              percentage={percentageOfTotalValue}
              maxWidth="100%"
              index={index}
            />
          </div>
        </div>
      }
      icons={icons || ''}
      dottedName={dottedName}
      isReadOnly={isReadOnly}
      content={
        <SubcategoriesList
          category={dottedName}
          subcategories={subcategories}
        />
      }
    />
  )
}
