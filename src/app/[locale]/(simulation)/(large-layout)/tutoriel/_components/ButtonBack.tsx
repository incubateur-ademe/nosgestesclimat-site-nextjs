'use client'

import Trans from '@/components/translation/trans/TransClient'
import { tutorielClickPrecedent } from '@/constants/tracking/pages/tutoriel'
import Button from '@/design-system/buttons/Button'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/analytics/trackEvent'

export default function ButtonBack() {
  const { t } = useClientTranslation()

  return (
    <Button
      color="secondary"
      title={t("Revenir à l'accueil")}
      onClick={() => {
        trackEvent(tutorielClickPrecedent)
        if (typeof window !== 'undefined') {
          window.history.back()
        }
      }}>
      ← <Trans>Précédent</Trans>
    </Button>
  )
}
