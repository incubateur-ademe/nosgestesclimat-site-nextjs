'use client'
import CheckIcon from '@/components/icons/CheckIcon'
import Trans from '@/components/translation/Trans'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'

export default function NewslettersBlock() {
  const { data: numberSubscribers } = useNumberSubscribers()

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-8">
      <h3>Vous souhaitez recevoir nos derniers articles directement ?</h3>

      <p>
        <CheckIcon className="mr-2 h-4 w-4 stroke-green-500" />
        <span>
          {numberSubscribers ?? 0} <Trans>personnes inscrites</Trans>
        </span>
      </p>
    </div>
  )
}
