'use client'

import Trans from '@/components/translation/trans/TransClient'
import { linkToGroupCreation } from '@/constants/group'
import {
  captureClickDashboardGroupPageNoGroupsCreate,
  clickDashboardGroupPageNoGroupsCreate,
} from '@/constants/tracking/user-account'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { trackEvent, trackPosthogEvent } from '@/utils/analytics/trackEvent'

export default function CreateGroupButton() {
  return (
    <ButtonLink
      onClick={() => {
        trackEvent(clickDashboardGroupPageNoGroupsCreate)
        trackPosthogEvent(captureClickDashboardGroupPageNoGroupsCreate)
      }}
      href={linkToGroupCreation}>
      <Trans i18nKey="mon-espace.groups.empty.button">Créer un groupe</Trans>
    </ButtonLink>
  )
}
