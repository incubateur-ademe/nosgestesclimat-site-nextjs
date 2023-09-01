'use client'
import { useRule } from '@/publicodes-state'
import { useSearchParams } from 'next/navigation'

type Props = {
  isSelected: boolean
  dottedName: string
  countByCategory: any
}

export default function Filter({
  isSelected,
  dottedName,
  countByCategory,
}: Props) {
  const rule = useRule(dottedName)

  const metric = useSearchParams().get('métrique') || ''

  const getBackgroundColor = () => {
    switch (true) {
      case isSelected:
        return '#aaa'
      default:
        return rule.color
    }
  }

  return (
    <li
      className="rounded-sm height-[1.8rem]"
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        className="text-white font-bold"
        onClick={() => {
          console.log(
            new URLSearchParams({
              ...(metric ? { métrique: metric } : {}),
              ...(isSelected ? {} : { catégorie: dottedName }),
            })
          )
        }}>
        {rule.title}{' '}
        <span className="bg-white text-primaryDark rounded-md w-4 inline-block">
          {countByCategory[dottedName] || 0}
        </span>
      </button>
    </li>
  )
}
