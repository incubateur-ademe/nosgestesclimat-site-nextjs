import PlusIcon from '@/components/icons/PlusIcon'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { twMerge } from 'tailwind-merge'

type Props = {
  hasNoPollsYet?: boolean
}

export default function AddPollCard({ hasNoPollsYet }: Props) {
  return (
    <div
      className={twMerge(
        'flex flex-col rounded-xl bg-primary-100 p-6',
        hasNoPollsYet ? 'border-rainbow' : ''
      )}>
      <div className="flex flex-1 items-center justify-center">
        <PlusIcon className="h-16 w-16 fill-primary-700" />
      </div>
      <ButtonLink
        className="w-full"
        color={hasNoPollsYet ? 'primary' : 'secondary'}
        href={`/organisations/nouvelle-campagne`}>
        <Trans>Créer un nouveau sondage</Trans>
      </ButtonLink>
    </div>
  )
}
