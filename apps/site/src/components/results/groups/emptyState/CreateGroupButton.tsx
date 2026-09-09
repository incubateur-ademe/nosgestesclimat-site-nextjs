'use client'

import Trans from '@/components/translation/trans/TransClient'
import { linkToGroupCreation } from '@/constants/group'
import { captureClickDashboardGroupPageNoGroupsCreate } from '@/constants/tracking/trackers'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function CreateGroupButton() {
  return (
    <ButtonLink
      onClick={() => {
        trackEvent(captureClickDashboardGroupPageNoGroupsCreate)
      }}
      data-testid="create-group-button"
      href={linkToGroupCreation}>
      <Trans i18nKey="mon-espace.groups.empty.button">Créer un groupe</Trans>
    </ButtonLink>
  )
}
