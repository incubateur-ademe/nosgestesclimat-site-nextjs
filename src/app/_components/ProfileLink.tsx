'use client'

import profileIcon from '@/assets/images/silhouette.svg'
import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import { Appear } from '@/design-system/utils/Animate'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'
import Image from 'next/image'

export default function ProfileLink() {
  const { getCurrentSimulation } = useUser()
  const { t } = useClientTranslation()

  if (!Object.keys(getCurrentSimulation()?.situation || {}).length) return
  return (
    <Appear delay={1}>
      <div className="md:flex md:justify-center">
        <InlineLink
          href="/profil"
          title={t('Page profil')}
          className="flex w-[18rem] items-center rounded-sm">
          <Image alt="" src={profileIcon} className="h-auto w-6" />
          <span className="ml-2">
            <Trans>Voir le détail de ma simulation</Trans>
          </span>
        </InlineLink>
      </div>
    </Appear>
  )
}
