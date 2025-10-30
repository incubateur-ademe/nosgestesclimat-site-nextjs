'use client'

import PlusIcon from '@/components/icons/PlusIcon'
import Trans from '@/components/translation/trans/TransClient'
import CTACard from '@/design-system/actions/CTACard'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useParams } from 'next/navigation'

type Props = {
  hasNoPollsYet?: boolean
}

export default function AddPollCard({ hasNoPollsYet }: Props) {
  const { orgaSlug } = useParams()

  const { t } = useClientTranslation()

  return (
    <li>
      <CTACard
        href={`/organisations/${orgaSlug}/creer-campagne`}
        highlight={!!hasNoPollsYet}
        color={hasNoPollsYet ? 'primary' : 'secondary'}
        imageSrc="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/medium_people_raising_arm_fe915601cd.png"
        imageAlt=""
        label={<Trans>Créer une campagne</Trans>}
        icon={
          <PlusIcon
            className={
              hasNoPollsYet
                ? 'min-w-8 stroke-white'
                : 'stroke-primary-700 min-w-8'
            }
          />
        }
      />
    </li>
  )
}
