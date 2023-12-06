import Link from '@/components/Link'
import ActionCard from '@/design-system/actions/ActionCard'
import { useRule } from '@/publicodes-state'

export default function RecommendedAction({
  actionDottedName,
}: {
  actionDottedName: string
}) {
  const { icons, title, numericValue } = useRule(actionDottedName)

  return (
    <li>
      <ActionCard
        icons={icons || ''}
        title={title || ''}
        footprintAvoided={numericValue}
        tag={Link}
        href={`/actions/${actionDottedName}`}
        className="transition-colors hover:bg-grey-100"
      />
    </li>
  )
}
