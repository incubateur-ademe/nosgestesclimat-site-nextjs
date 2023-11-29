'use client'
import { getBackgroundColor } from '@/helpers/getCategoryColorClass'
import { useRule } from '@/publicodes-state'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
  dottedName: string
  countByCategory: any
}

export default function Filter({ dottedName, countByCategory }: Props) {
  const { title } = useRule(dottedName)

  const router = useRouter()

  const metric = useSearchParams().get('métrique') || ''
  const categorySelected = useSearchParams().get('catégorie') || ''

  const isSelected = categorySelected === dottedName

  const buildURL = () => {
    const siteURL = `${window.location.origin}${window.location.pathname}`

    const searchParamsStart = metric || !isSelected ? '?' : ''

    const metricSearchParam = metric ? `métrique=${metric}&` : ''

    const searchParamsPart = `${searchParamsStart}${metricSearchParam}${
      isSelected ? '' : `catégorie=${dottedName}`
    }`

    return `${siteURL}${searchParamsPart}`
  }

  return (
    <li
      className={`height-[1.8rem] rounded-md ${
        !categorySelected || categorySelected === dottedName
          ? getBackgroundColor(dottedName)
          : 'bg-gray-200'
      }`}
      style={{
        backgroundColor: getBackgroundColor(),
      }}>
      <button
        className="p-2 text-xs font-bold text-white"
        onClick={() => {
          router.replace(buildURL(), {
            scroll: false,
          })
        }}>
        {title}{' '}
        <span className="ml-2 inline-block w-4 rounded-full bg-white text-primary-700">
          {countByCategory[dottedName] || 0}
        </span>
      </button>
    </li>
  )
}
