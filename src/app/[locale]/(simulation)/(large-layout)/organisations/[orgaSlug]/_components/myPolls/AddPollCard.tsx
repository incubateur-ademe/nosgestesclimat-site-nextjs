'use client'

import Link from '@/components/Link'
import PlusIcon from '@/components/icons/PlusIcon'
import Trans from '@/components/translation/Trans'
import {
  baseClassNames,
  colorClassNames,
  sizeClassNames,
} from '@/design-system/inputs/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type Props = {
  hasNoPollsYet?: boolean
}

export default function AddPollCard({ hasNoPollsYet }: Props) {
  const { orgaSlug } = useParams()

  const { t } = useClientTranslation()

  return (
    <Link
      href={`/organisations/${orgaSlug}/creer-campagne`}
      className={twMerge(
        'flex min-h-64 flex-col rounded-xl bg-primary-50 p-6 no-underline',
        hasNoPollsYet ? 'rainbow-border' : ''
      )}>
      <div className="mb-6 flex flex-1 items-center justify-center">
        <Image
          className="self-start"
          src="/images/illustrations/people-raising-arm.png"
          width="200"
          height="400"
          alt={t(
            'Deux personnes se faisant une accolade en levant le bras en signe de victoire.'
          )}
        />
      </div>

      <div
        className={twMerge(
          '!w-full text-sm',
          baseClassNames,
          sizeClassNames.md,
          hasNoPollsYet ? colorClassNames.primary : colorClassNames.secondary
        )}
        color={hasNoPollsYet ? 'primary' : 'secondary'}>
        <PlusIcon
          className={twMerge(
            'min-w-8',
            hasNoPollsYet ? 'stroke-white' : 'stroke-primary-700'
          )}
        />
        <Trans>Créer une campagne</Trans>
      </div>
    </Link>
  )
}
