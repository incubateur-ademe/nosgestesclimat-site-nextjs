import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import BarChart from '@/design-system/utils/BarChart'
import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import SubcategoriesList from './SubcategoriesList'

export default function AccordionItemWithRule({
  dottedName,
}: {
  dottedName: string
}) {
  const { title, icons, numericValue } = useRule(dottedName)

  const { numericValue: totalValue } = useRule('bilan')

  const percentageOfTotalValue = 1 - (totalValue - numericValue) / totalValue

  const isReadOnly = dottedName === 'services sociétaux'

  return (
    <AccordionItem
      title={
        <div className="flex w-full items-center gap-8">
          <div className="flex min-w-[11rem] items-center gap-2">
            <Emoji>{icons}</Emoji>{' '}
            <p
              className={`mb-0 ${
                isReadOnly
                  ? ''
                  : 'underline decoration-dotted underline-offset-4'
              }`}>
              {title}
            </p>
          </div>
          <div className="hidden flex-1 md:block">
            <BarChart
              type="horizontal"
              percentage={percentageOfTotalValue}
              maxWidth="100%"
            />
          </div>
        </div>
      }
      icons={icons || ''}
      dottedName={dottedName}
      content={<SubcategoriesList category={dottedName} />}
      isReadOnly={isReadOnly}
    />
  )
}
