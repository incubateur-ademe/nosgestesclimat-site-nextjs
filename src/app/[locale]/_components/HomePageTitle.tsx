'use client'

import Trans from '@/components/translation/trans/TransClient'
import { HERO_SECTION_FLAG_KEY } from '@/constants/ab-test'
import { useIsTestVersion } from '@/hooks/abTesting/useIsTestVersion'

export default function HomePageTitle() {
  const isTestVersion = useIsTestVersion(HERO_SECTION_FLAG_KEY)

  return isTestVersion ? (
    <Trans>Découvrez votre empreinte carbone</Trans>
  ) : (
    <Trans>Connaissez-vous votre empreinte carbone et eau ?</Trans>
  )
}
