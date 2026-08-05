'use client'

import Trans from '@/components/translation/trans/TransClient'
import { COLLECTIVE_TEST_MODE_PATH } from '@/constants/urls/paths'
import { useCollectiveTestFlow } from './CollectiveTestProvider'
import CollectiveTestStepLayout from './CollectiveTestStepLayout'
import OrganisationCreationForm from './OrganisationCreationForm'

export default function CollectiveTestOrganisationView() {
  const { currentStep } = useCollectiveTestFlow()

  if (currentStep !== 'organisation') {
    return null
  }

  return (
    <CollectiveTestStepLayout
      backHref={COLLECTIVE_TEST_MODE_PATH}
      title={
        <Trans>Pour finir, donnez un nom à votre organisation</Trans>
      }
      titleClassName="mb-6"
      hasSeparator={false}>
      <OrganisationCreationForm />
    </CollectiveTestStepLayout>
  )
}
