'use client'

import Trans from '@/components/translation/Trans'
import { matomoEventModeGroupeCTAStart } from '@/constants/matomo'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'

export default function GroupsLink() {
  return (
    <ButtonLink
      href="/amis"
      onClick={() => {
        trackEvent(matomoEventModeGroupeCTAStart)
      }}
      data-cypress-id="as-a-group-link"
      size="lg"
      color="secondary">
      <Image
        src="/images/misc/silhouettes.svg"
        alt=""
        className="mr-4 h-auto w-8"
        width={100}
        height={100}
        aria-hidden
      />
      <span>
        <Trans>En groupe</Trans>
      </span>
    </ButtonLink>
  )
}
