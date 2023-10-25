import AccordionItem from '@/design-system/layout/accordion/AccordionItem'
import { useRule } from '@/publicodes-state'
import SubcategoriesList from './SubcategoriesList'

export default function AccordionItemWithRule({
  dottedName,
}: {
  dottedName: string
}) {
  const { title, icons } = useRule(dottedName)

  return (
    <AccordionItem
      title={title || ''}
      icons={icons || ''}
      dottedName={dottedName}
      content={<SubcategoriesList category={dottedName} />}
      isReadOnly={dottedName === 'services sociétaux'}
    />
  )
}
