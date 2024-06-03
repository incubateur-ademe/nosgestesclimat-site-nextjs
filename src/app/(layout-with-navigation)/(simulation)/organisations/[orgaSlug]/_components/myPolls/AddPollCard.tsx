'use client'

import Link from '@/components/Link'
import PlusIcon from '@/components/icons/PlusIcon'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type Props = {
  hasNoPollsYet?: boolean
}

export default function AddPollCard({ hasNoPollsYet }: Props) {
  const { orgaSlug } = useParams()
  return (
    <Link
      href={`/organisations/${orgaSlug}/creer-campagne`}
      className={twMerge(
        'flex min-h-64 flex-col rounded-xl bg-primary-50 p-6 no-underline',
        hasNoPollsYet ? 'rainbow-border' : ''
      )}>
      <div className="flex flex-1 items-center justify-center">
        <PlusIcon className="h-16 w-16 fill-primary-700" />
      </div>
      <ButtonLink
        href={`/organisations/${orgaSlug}/creer-campagne`}
        className="!w-full text-sm "
        color={hasNoPollsYet ? 'primary' : 'secondary'}>
        <Trans>Créer une campagne</Trans>
      </ButtonLink>
    </Link>
  )
}
