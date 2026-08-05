'use client'

import Trans from '@/components/translation/trans/TransClient'
import { ORGANISATION_HOME_PAGE } from '@/constants/urls/paths'
import { useCollectiveTestFlow } from './CollectiveTestProvider'
import CollectiveTestStepLayout from './CollectiveTestStepLayout'
import PollNameForm from './PollNameForm'

export default function CollectiveTestInformationsView() {
  const { currentStep } = useCollectiveTestFlow()

  if (currentStep !== 'informations') {
    return null
  }

  return (
    <CollectiveTestStepLayout
      backHref={ORGANISATION_HOME_PAGE}
      title={
        <Trans i18nKey="collectiveTest.title">
          Choisissez un nom pour votre test collectif
        </Trans>
      }>
      <p className="mb-2">
        <Trans i18nKey="collectiveTest.text1">
          Créez un lien personnalisé{' '}
          <strong>à partager dans votre organisation</strong>.
        </Trans>
      </p>

      <p className="mb-8">
        <Trans i18nKey="collectiveTest.text2">
          Les participants passent le test <strong>anonymement</strong> et vous
          accédez à une <strong>synthèse des résultats</strong>.
        </Trans>
      </p>

      <PollNameForm />
    </CollectiveTestStepLayout>
  )
}
