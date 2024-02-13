import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ChevronRight from '@/design-system/icons/ChevronRight'
import { useAppNavigation } from '@/hooks/navigation/useAppNavigation'
import { PollInfo } from '@/types/organisations'

type Props = {
  poll: PollInfo
}

export default function PollItem({ poll }: Props) {
  const { linkToPollDashboard } = useAppNavigation()

  return (
    <Link
      href={linkToPollDashboard({ orgaSlug: poll.organisationInfo?.slug })}
      className="rounded-sm border-[1px] border-solid border-gray-200 bg-gray-100 px-5 py-2 no-underline decoration-auto">
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center">
          <div>
            <div className="text-md font-bold text-gray-900">
              {poll.organisationInfo?.name}
            </div>
            <div className="flex gap-1 text-sm text-violet-900">
              <span className="whitespace-nowrap">
                {poll.numberOfParticipants ?? 0} <Trans>participant</Trans>
                {poll.numberOfParticipants > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <ChevronRight />
          </div>
        </div>
      </div>
    </Link>
  )
}
