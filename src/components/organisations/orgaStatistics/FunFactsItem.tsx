import Emoji from '@/design-system/utils/Emoji'
import { useRule } from '@/publicodes-state'
import { FunFacts } from '@/types/organisations'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'

type Props = {
  funFactKey: string
  dottedName: DottedName
  funFacts: FunFacts
}

export default function FunFactsItem({
  funFactKey,
  dottedName,
  funFacts,
}: Props) {
  const { title, icons } = useRule(dottedName)

  const itemValue = funFacts?.[funFactKey as keyof FunFacts]

  if (itemValue === undefined || itemValue === null) {
    return null
  }

  return (
    <div className="text-lg">
      <Emoji className="mr-2 inline-block">{icons}</Emoji>
      <span className="text-2xl font-medium">{Math.round(itemValue)}</span>{' '}
      <span>%</span> <span>{title}</span>
    </div>
  )
}
