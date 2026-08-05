'use client'

import AuthenticateUserForm from '@/components/authentication/AuthenticateUserForm'
import SigninSignupTabs from '@/components/signIn/SignInSignUpTabs'
import Trans from '@/components/translation/trans/TransClient'
import { SIGNUP_MODE } from '@/constants/authentication/modes'
import { captureOrganisationsLoginComplete } from '@/constants/tracking/pages/organisationsConnexion'
import { COLLECTIVE_TEST_MODE_PATH } from '@/constants/urls/paths'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import type { AuthenticationMode } from '@/types/authentication'
import { useCollectiveTestFlow } from './CollectiveTestProvider'
import CollectiveTestStepLayout from './CollectiveTestStepLayout'

interface Props {
  mode: AuthenticationMode
}

export default function CollectiveTestAuthView({ mode }: Props) {
  const { t } = useClientTranslation()
  const { currentStep, send } = useCollectiveTestFlow()

  if (currentStep !== 'authentification') {
    return null
  }

  return (
    <CollectiveTestStepLayout
      backHref={COLLECTIVE_TEST_MODE_PATH}
      title={
        <Trans i18nKey="organisations.connexion.title">
          Connectez-vous pour diffuser votre lien de test collectif
        </Trans>
      }>
      <p className="mb-8 max-w-full md:w-160">
        <Trans i18nKey="organisations.connexion.subtitle">
          Pour diffuser votre test collectif à vos élèves, vos étudiants, vos
          collègues ou vos clients, il vous suffit de créer votre espace
          personnel sécurisé. Accédez ensuite aux résultats des participants
          sous forme de graphiques comparatifs.
        </Trans>
      </p>

      <div className="max-w-full md:w-160">
        <SigninSignupTabs
          className="-order-1 mb-8 lg:mb-14"
          mode={mode}
        />
        <AuthenticateUserForm
          onComplete={(user) => send({ type: 'AUTH_COMPLETED', user })}
          tracker={captureOrganisationsLoginComplete}
          buttonLabel={
            mode === SIGNUP_MODE
              ? t(
                  'organisations.inscription.cta',
                  'Créer mon compte'
                )
              : undefined
          }
        />
      </div>
    </CollectiveTestStepLayout>
  )
}
