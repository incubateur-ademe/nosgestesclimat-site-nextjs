'use client'

import profileIcon from '@/assets/images/silhouette.svg'
import TransClient from '@/components/translation/TransClient'
import InlineLink from '@/design-system/inputs/InlineLink'
import { Appear } from '@/design-system/utils/Animate'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useForm } from '@/publicodes-state'
import Image from 'next/image'

export default function ProfileLink() {
  const params = useForm()
  console.log(params)
  const { t } = useClientTranslation()

  if (!params?.progression) {
    return null
  }

  return (
    <Appear delay={1}>
      <div className="md:flex md:justify-center">
        <InlineLink
          href="/profil"
          title={t('Page profil')}
          className="w-[18rem] rounded-sm flex items-center">
          <Image alt="" src={profileIcon} className="w-6 h-auto" />
          <span className="ml-2">
            <TransClient>Voir le détail de ma simulation</TransClient>
          </span>
        </InlineLink>
      </div>
    </Appear>
  )
}
