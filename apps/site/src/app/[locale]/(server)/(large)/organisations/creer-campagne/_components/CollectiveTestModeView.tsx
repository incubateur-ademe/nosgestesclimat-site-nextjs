'use client'

import Trans from '@/components/translation/trans/TransClient'
import { COLLECTIVE_TEST_INFORMATIONS_PATH } from '@/constants/urls/paths'
import { useCollectiveTestFlow } from './CollectiveTestProvider'
import CollectiveTestStepLayout from './CollectiveTestStepLayout'
import PollModeForm from './PollModeForm'

export default function CollectiveTestModeView() {
  const { currentStep } = useCollectiveTestFlow()

  if (currentStep !== 'mode') {
    return null
  }

  return (
    <CollectiveTestStepLayout
      backHref={COLLECTIVE_TEST_INFORMATIONS_PATH}
      itemsCenter
      title={
        <Trans i18nKey="collectiveTest.mode.title">
          Choisissez le mode du test
        </Trans>
      }>
      <PollModeForm />
    </CollectiveTestStepLayout>
  )
}
