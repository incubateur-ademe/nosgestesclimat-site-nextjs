'use client'

import Trans from '@/components/translation/Trans'
import { usePollId } from '@/hooks/organisations/usePollId'
import { useClientTranslation } from '@/hooks/useClientTranslation'

export default function OrganisationPrivacy() {
  const { pollId } = usePollId()

  const { t } = useClientTranslation()

  // If there is no pollId, we don't display this section
  if (!pollId) {
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
