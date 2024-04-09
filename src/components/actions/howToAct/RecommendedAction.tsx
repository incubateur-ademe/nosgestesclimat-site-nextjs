'use client'

import Link from '@/components/Link'
import { endClickAction } from '@/constants/tracking/pages/end'
import ActionCard from '@/design-system/actions/ActionCard'
import { useRule } from '@/publicodes-state'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function RecommendedAction({
  actionDottedName,
}: {
  actionDottedName: DottedName
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
        onClick={() => trackEvent(endClickAction(actionDottedName))}
        className="transition-colors hover:bg-grey-100"
      />
    </li>
  )
}
