'use client'

import Trans from '@/components/translation/trans/TransClient'
import { linkToGroupCreation } from '@/constants/group'
import {
  captureClickDashboardGroupPageNoGroupsCreate,
} from '@/constants/tracking/user-account'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function CreateGroupButton() {
  return (
    <ButtonLink
      onClick={() => {
        trackPosthogEvent(captureClickDashboardGroupPageNoGroupsCreate)
      }}
      data-testid="create-group-button"
      href={linkToGroupCreation}>
      <Trans i18nKey="mon-espace.groups.empty.button">Créer un groupe</Trans>
    </ButtonLink>
  )
}
