'use client'

import Trans from '@/components/translation/trans/TransClient'
import { tutorielClickPrecedent } from '@/constants/tracking/pages/tutoriel'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function ButtonBack() {
  const { t } = useClientTranslation()

  return (
    <ButtonLink
      href="/"
      color="secondary"
      title={t("revenir à l'accueil")}
      onClick={() => trackEvent(tutorielClickPrecedent)}>
      ← <Trans>Précédent</Trans>
    </ButtonLink>
  )
}
