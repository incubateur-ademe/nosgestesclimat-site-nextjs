'use client'

import RedirectTimer from '@/components/interactions/RedirectTimer'
import MessageTemplate from '@/components/layout/MessageTemplate'
import Trans from '@/components/translation/trans/TransClient'
import { usePartner } from '@/contexts/partner/PartnerContext'
import Emoji from '@/design-system/utils/Emoji'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation } from '@/publicodes-state'
import RedirectLink from './RedirectLink'

export default function AdaptiveMessage({
  partnerInfo,
}: {
  partnerInfo: {
    name: string
  }
}) {
  const { t } = useClientTranslation()
  const { progression } = useCurrentSimulation()

  const isTestCompleted = progression === 1

  const { redirectUrl } = usePartner()

  const href = isTestCompleted ? redirectUrl : getLinkToSimulateur()

  return (
    <MessageTemplate
      title={t(
        'Notre partenaire {{name}} vous a invité à leur transmettre vos empreintes carbone et eau.',
        {
          name: partnerInfo.name,
        }
      )}
      description={
        isTestCompleted ? (
          <>
            <p data-testid="redirection-message">
              <Trans>C'est chose faite !</Trans> <Emoji>✅</Emoji>{' '}
              <Trans>
                Vous allez être redirigé vers le site de notre partenaire dans :
              </Trans>
            </p>
            <RedirectTimer href={href} />
          </>
        ) : (
          <>
            <p data-testid="test-message">
              <Trans>
                Vous allez être redirigé vers notre calculateur dans :
              </Trans>
            </p>
            <RedirectTimer href={href} />
          </>
        )
      }
      buttonElement={
        <RedirectLink href={href}>
          {isTestCompleted ? (
            <Trans>Aller sur le site partenaire maintenant</Trans>
          ) : (
            <Trans>Commencer le test maintenant</Trans>
          )}
        </RedirectLink>
      }
    />
  )
}
