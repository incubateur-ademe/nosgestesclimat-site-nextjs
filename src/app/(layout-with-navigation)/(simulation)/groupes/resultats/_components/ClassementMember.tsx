import TransClient from '@/components/translation/TransClient'
import { JSX } from 'react'
import Badge from './Badge'

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
            <TransClient>Vous</TransClient>
          </Badge>
        )}
      </div>
      <div>{quantity}</div>
    </li>
  )
}
