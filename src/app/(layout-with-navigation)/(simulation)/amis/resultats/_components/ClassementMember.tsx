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
      <div className="mb-0 flex items-center">
        <span className={`mr-2 ${isTopThree ? 'text-2xl' : 'ml-1 text-lg'}`}>
          {rank}
        </span>
        {name}
        {isCurrentMember && (
          <Badge className="ml-2 inline rounded-sm !border-pink-100 !bg-pink-200 !text-xs !text-pink-500">
            <Trans>Vous</Trans>
          </Badge>
        )}
      </div>
      <div>{quantity}</div>
    </li>
  )
}
