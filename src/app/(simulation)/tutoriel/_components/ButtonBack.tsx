'use client'

import Trans from '@/components/translation/Trans'
import { tutorielClickPrecedent } from '@/constants/tracking/pages/tutoriel'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'

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
