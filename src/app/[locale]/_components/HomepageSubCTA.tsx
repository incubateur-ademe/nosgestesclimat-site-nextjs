'use client'

import Trans from '@/components/translation/trans/TransClient'
import { HERO_SECTION_FLAG_KEY } from '@/constants/ab-test'
import { useIsTestVersion } from '@/hooks/abTesting/useIsTestVersion'

export default function HomepageSubCTA() {
  const isTestVersion = useIsTestVersion(HERO_SECTION_FLAG_KEY)

  return isTestVersion ? (
    <p>
      <strong className="text-primary-700">
        <Trans>Résultats immédiats, sans inscription.</Trans>
      </strong>{' '}
    </p>
  ) : (
    <p className="md:max-w-[300px]">
      <strong className="text-primary-700">
        <Trans i18nKey="common.mainLandingPage.numberPersons">
          2,5 millions de personnes
        </Trans>
      </strong>{' '}
      <Trans i18nKey="common.mainLandingPage.tookTheirTest">
        ont déjà calculé leur empreinte !
      </Trans>
    </p>
  )
}
