'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ChevronRight from '@/design-system/icons/ChevronRight'
import { Group } from '@/types/groups'

type Props = {
  group: Group
  index: number
}

export default function GroupItem({ group }: Props) {
  return (
    <Link
      href={`/amis/resultats?groupId=${group?._id}`}
      className="mb-3 rounded-sm border-[1px] border-solid border-gray-200 bg-gray-100 px-5 py-2 no-underline decoration-auto">
      <div className="flex items-center justify-between py-4">
        <div className="flex w-full items-center">
          <div className="flex-shrink-0 text-2xl">
            <span>{group?.emoji}</span>
          </div>
          <div className="ml-4">
            <div className="text-md font-bold text-gray-900">
              {group?.name ?? 'Nom du groupe'}
            </div>
            <div className="flex gap-1 text-sm text-violet-900">
              <span className="whitespace-nowrap">
                {group?.members?.length ?? 0} <Trans>participant</Trans>
                {group?.members?.length > 1 ? 's' : ''}
              </span>{' '}
              <span> - </span>{' '}
              <div className="inline w-24 overflow-hidden text-ellipsis whitespace-nowrap md:w-60">
                {group?.members?.map((member) => member?.name).join(', ') ?? ''}
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
