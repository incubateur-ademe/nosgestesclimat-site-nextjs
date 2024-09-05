/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client'

import Trans from '@/components/translation/Trans'
import { tutorielClickQuestion } from '@/constants/tracking/pages/tutoriel'
import { useOrganisationQueryParams } from '@/hooks/organisations/useOrganisationQueryParams'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function OrganisationPrivacy() {
  const { pollSlug } = useOrganisationQueryParams()

  const { t } = useClientTranslation()

  // If there is no pollSlug, we don't display this section
  if (!pollSlug) {
    return null
  }

  return (
    <li className="mb-2" id={'empreinte'}>
      <details>
        <summary
          className="cursor-pointer text-sm font-bold text-primary-700 md:text-lg"
          onClick={() =>
            trackEvent(
              tutorielClickQuestion('Mes données restent-elles privées ?')
            )
          }>
          {t('Mes données restent-elles privées\u202f?')}
        </summary>
        <div className="my-2 ml-3.5">
          <p>
            <Trans>
              Vos données seront stockées de manière sécurisée et anonyme. Elles
              seront agrégées à des fins statistiques ; lesdites statistiques
              seront consultables sur la page "Rapport détaillé" de votre
              sondage en fin de parcours. Cette page restera exclusivement
              accessible aux participant·es ainsi qu'aux organisateur·ices.
            </Trans>
          </p>
        </div>
      </details>
    </li>
  )
}
