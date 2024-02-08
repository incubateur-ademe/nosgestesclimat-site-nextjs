'use client'

import Trans from '@/components/translation/Trans'
import { useOrganisationQueryParams } from '@/hooks/organizations/useOrganisationQueryParams'
import { useClientTranslation } from '@/hooks/useClientTranslation'

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
        <summary className="cursor-pointer text-sm font-bold text-primary-500 md:text-lg">
          {t('Mes données restent-elles privées\u202f?')}
        </summary>
        <div className="my-2 ml-3.5">
          <p>
            <Trans>TO DO</Trans>
          </p>
        </div>
      </details>
    </li>
  )
}
