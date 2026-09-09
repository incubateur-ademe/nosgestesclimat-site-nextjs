'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/trans/TransClient'
import { captureClickResultsListResultViewDetail } from '@/constants/tracking/trackers'
import { MON_ESPACE_RESULTS_DETAIL_PATH } from '@/constants/urls/paths'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function SeeListItemDetailLink({
  simulationId,
}: {
  simulationId: string
}) {
  return (
    <Link
      className="text-primary-700 underline"
      href={MON_ESPACE_RESULTS_DETAIL_PATH.replace(
        ':simulationId',
        simulationId
      )}
      onClick={() => {
        trackEvent(captureClickResultsListResultViewDetail)
      }}>
      <Trans i18nKey="mon-espace.resultsList.result.viewDetail">
        Voir le détail
      </Trans>
    </Link>
  )
}
