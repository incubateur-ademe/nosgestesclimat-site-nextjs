'use client'

import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function AcceptedState() {
  const { t } = useClientTranslation()
  return (
    <div data-testid="accepted-state">
      <Title
        tag="h2"
        className="text-lg font-bold"
        title={t('Merci de votre intérêt !')}
      />

      <p>
        <Trans>
          La création de compte sera bientôt disponible, vous en serez informé
          ici.
        </Trans>
      </p>
    </div>
  )
}
