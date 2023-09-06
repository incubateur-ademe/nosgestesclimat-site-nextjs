'use client'

import Button from '@/design-system/inputs/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { Trans } from 'react-i18next'

export default function PetrolFilter() {
  const searchParams = useSearchParams()
  const métrique = searchParams.get('métrique')

  const router = useRouter()

  const isSelected = métrique === 'co2'

  const handleClick = () => {
    router.replace(
      isSelected
        ? // URL without search params
          `${window.location.origin}${window.location.pathname}`
        : `${window.location.href}?métrique=co2`
    )
  }

  return (
    <Button
      className="!inline-block mx-auto mb-2 w-64 text-center py-1 px-2 rounded-md text-white font-bold bg-primaryDark"
      onClick={handleClick}
      size="sm">
      <span>
        <Trans>Réduire ma conso de pétrole</Trans>
      </span>
    </Button>
  )
}
