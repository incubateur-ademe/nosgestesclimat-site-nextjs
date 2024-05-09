import Title from '@/design-system/layout/Title'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'

export default function FunFactsPlusCategoryTitle({
  category,
}: {
  category: DottedName
}) {
  const { title } = useRule(category)
  return <Title tag="h3">{title}</Title>
}
