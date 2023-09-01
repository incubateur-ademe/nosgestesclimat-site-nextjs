'use client'

import silhouette from '@/assets/images/silhouettes.svg'
import TransClient from '@/components/translation/TransClient'
import { matomoEventModeGroupeCTAStart } from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'

export default function GroupsLink() {
  return (
    <ButtonLink
      href="/groupe"
      onClick={() => {
        trackEvent(matomoEventModeGroupeCTAStart)
      }}
      data-cypress-id="as-a-group-link"
      size="lg"
      color="secondary">
      <Image src={silhouette} alt="" className="mr-4 h-auto w-8" />
      <span>
        <TransClient>En groupe</TransClient>
      </span>
    </ButtonLink>
  )
}
