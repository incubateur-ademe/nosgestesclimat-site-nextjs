'use client'

import Trans from '@/components/translation/trans/TransClient'
import { HERO_SECTION_FLAG_KEY } from '@/constants/ab-test'
import { useIsTestVersion } from '@/hooks/abTesting/useIsTestVersion'

export default function HomePageDescription() {
  const isTestVersion = useIsTestVersion(HERO_SECTION_FLAG_KEY)

  return isTestVersion ? (
    <p className="mb-0 text-base md:order-1 md:text-2xl">
      <Trans>
        <strong className="text-primary-700">
          Obtenez votre estimation personnalisée
        </strong>{' '}
        et des <strong className="text-secondary-700">pistes concrètes</strong>{' '}
        pour la réduire.
      </Trans>
    </p>
  ) : (
    <p className="mb-0 text-base md:order-1 md:text-2xl">
      <Trans>
        Calculez <strong className="text-primary-700">vos empreintes</strong> en{' '}
        <strong className="text-secondary-700">seulement 10 minutes</strong>.
      </Trans>
    </p>
  )
}
