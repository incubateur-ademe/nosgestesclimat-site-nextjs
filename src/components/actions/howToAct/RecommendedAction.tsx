'use client'

import Link from '@/components/Link'
import { endClickAction } from '@/constants/tracking/pages/end'
import ActionCard from '@/design-system/actions/ActionCard'
import {
  getBackgroundLightColor,
  getBorderColor,
} from '@/helpers/getCategoryColorClass'
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
        className={`border-2 ${getBorderColor(actionDottedName.split(' . ')[0])} ${getBackgroundLightColor(actionDottedName.split(' . ')[0])} transition-opacity hover:opacity-80`}
      />
    </li>
  )
}
