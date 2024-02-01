'use client'

import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useUser } from '@/publicodes-state'

export default function OrganisationPrivacy() {
  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const { t } = useClientTranslation()
  // if (!currentSimulation.organisation) {
  //   return null
  // }
  console.log(currentSimulation)

  return (
    <li className="mb-2" id={'empreinte'}>
      <details>
        <summary className="cursor-pointer text-sm font-bold text-primary-500 md:text-lg">
          {t('Mes données restent-elles privées\u202f?')}
        </summary>
        <div className="my-2 ml-3.5">
          <p>
            <Trans>
              hum je sais pas ? je sais pas rép à cette question moi meme
            </Trans>
          </p>
        </div>
      </details>
    </li>
  )
}
