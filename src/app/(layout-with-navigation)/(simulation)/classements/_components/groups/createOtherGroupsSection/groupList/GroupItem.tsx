'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import { classementClickGroup } from '@/constants/tracking/pages/classements'
import ChevronRight from '@/design-system/icons/ChevronRight'
import { getLinkToGroupDashboard } from '@/helpers/navigation/groupPages'
import { useUser } from '@/publicodes-state'
import { Group } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'

type Props = {
  group: Group
  index: number
}

export default function GroupItem({ group }: Props) {
  const { user } = useUser()
  const isAdministator = user.userId === group.administrator.userId

  return (
    <Link
      href={getLinkToGroupDashboard({ groupId: group._id })}
      onClick={() =>
        trackEvent(
          classementClickGroup({
            isAdministator,
            numParticipants: group.participants.length,
          })
        )
      }
      className="mb-3 rounded-sm border-[1px] border-solid border-gray-200 bg-gray-100 px-5 py-2 no-underline decoration-auto">
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center">
          <div className="flex-shrink-0 text-2xl">
            <span>{group.emoji}</span>
          </div>
          <div className="ml-4">
            <div className="text-md font-bold text-gray-900">
              {group.name ?? 'Nom du groupe'}
            </div>
            <div className="flex gap-1 text-sm text-violet-900">
              <span className="whitespace-nowrap">
                {group.participants.length ?? 0} <Trans>participant</Trans>
                {group.participants.length > 1 ? 's' : ''}
              </span>{' '}
              <span> - </span>{' '}
              <div className="inline w-24 overflow-hidden text-ellipsis whitespace-nowrap md:w-60">
                {group.participants
                  ?.map((participant) => participant?.name)
                  .join(', ') ?? ''}
              </div>
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
