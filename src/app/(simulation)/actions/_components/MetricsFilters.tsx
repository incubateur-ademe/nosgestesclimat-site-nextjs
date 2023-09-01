'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Trans } from 'react-i18next'

export default function MetricsFilters() {
  const searchParams = useSearchParams()
  const métrique = searchParams.get('métrique')

  const router = useRouter()

  const isSelected = !!métrique

  return (
    <button
      className={`${
        isSelected ? 'border-4 border-solid border-amber-500' : ''
      } mx-auto mb-2 w-64 text-center py-1 px-2 rounded-md text-white font-bold bg-primaryDark flex items-center justify-center`}
      onClick={() => {
        router.replace(
          window.location.href + (isSelected ? '' : '?métrique=co2')
        )
      }}>
      <span>
        <Trans>Réduire ma conso de pétrole</Trans>
      </span>
    </button>
  )
}
