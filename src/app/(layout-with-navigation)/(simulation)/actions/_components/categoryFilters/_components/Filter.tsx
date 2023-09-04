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
      className="height-[1.8rem] rounded-md"
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        className="p-2 text-xs font-bold text-white"
        onClick={() => {
          router.replace(
            `${window.location.origin}${window.location.pathname}${
              metric || !isSelected ? '?' : ''
            }${metric ? `métrique=${metric}` : ''}${
              isSelected ? '' : `${metric ? '&' : ''}catégorie=${dottedName}`
            }`,
            {
              scroll: false,
            }
          )
        }}>
        {rule.title}{' '}
        <span className="ml-2 inline-block w-4 rounded-full bg-white text-primaryDark">
          {countByCategory[dottedName] || 0}
        </span>
      </button>
    </li>
  )
}
