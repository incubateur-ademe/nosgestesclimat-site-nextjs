'use client'
import { useRule } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  dottedName: string
  countByCategory: any
}

export default function Filter({ dottedName, countByCategory }: Props) {
  const rule = useRule(dottedName)

  const router = useRouter()

  const metric = useSearchParams().get('métrique') || ''
  const categorySelected = useSearchParams().get('catégorie') || ''

  const isSelected = categorySelected === dottedName

  const getBackgroundColor = () => {
    switch (true) {
      case categorySelected && !isSelected:
        return '#aaa'
      case categorySelected === dottedName:
      default:
        return rule.color
    }
  }

  return (
    <li
      className="rounded-md height-[1.8rem]"
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        className="text-white font-bold text-xs p-2"
        onClick={() => {
          router.replace(
            `${window.location.origin}${window.location.pathname}${
              metric || !isSelected ? '?' : ''
            }${metric ? `métrique=${metric}` : ''}${
              isSelected ? '' : `${metric ? '&' : ''}catégorie=${dottedName}`
            }`
          )
        }}>
        {rule.title}{' '}
        <span className="bg-white text-primaryDark rounded-full w-4 inline-block ml-2">
          {countByCategory[dottedName] || 0}
        </span>
      </button>
    </li>
  )
}
