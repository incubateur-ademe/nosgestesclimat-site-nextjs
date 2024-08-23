import Trans from '@/components/translation/Trans'
import Badge from '@/design-system/layout/Badge'
import { JSX } from 'react'

export default function ClassementMember({
  rank,
  name,
  quantity,
  isTopThree,
  isCurrentMember,
}: {
  rank: JSX.Element | string
  name: string
  quantity: JSX.Element | string
  isTopThree?: boolean
  isCurrentMember?: boolean
}) {
  return (
    <li className="flex items-center justify-between">
      <div className="mb-0 flex items-center text-sm md:text-base">
        <span
          className={`mr-2 ${
            isTopThree ? 'text-lg md:text-2xl' : 'ml-1 text-base md:text-lg'
          }`}>
          {rank}
        </span>

        {name}

        {isCurrentMember && (
          <Badge className="ml-2 inline rounded-xl border-pink-100 bg-pink-200 text-xs font-bold text-secondary-700">
            <Trans>Vous</Trans>
          </Badge>
        )}
      </div>

      <div>{quantity}</div>
    </li>
  )
}
