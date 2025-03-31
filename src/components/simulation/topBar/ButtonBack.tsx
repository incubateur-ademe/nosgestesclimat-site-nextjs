'use client'

import ChevronLeft from '@/components/icons/ChevronLeft'
import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function ButtonBack({
  onClick = () => {},
}: {
  onClick?: () => void
}) {
  const { t } = useClientTranslation()

  return (
    <button
      data-cypress-id="back-button"
      className="relative block h-8 w-8"
      aria-label={t('Retour')}
      onClick={onClick}>
      <ChevronLeft className="h-auto w-full stroke-primary-700 transition-transform hover:-translate-x-2" />
    </button>
  )
}
