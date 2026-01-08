'use client'

import GroupLoader from '@/components/groups/GroupLoader'
import GroupNotFound from '@/components/groups/GroupNotFound'
import StepsDisplay from '@/components/groups/StepsDisplay'
import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import InvitationForm from '../_components/InvitationForm'
import LaconicRanking from '../_components/LaconicRanking'
import { useSetupPage } from '../_hooks/useSetupPage'

export default function RejoindreGroupeNomPage() {
  const {
    isGuardInit,
    isGuardRedirecting,
    group,
    isLoading,
    authenticatedUser,
  } = useSetupPage()

  // If we are still fetching the group (or we are redirecting the user), we display a loader
  if (!isGuardInit || isGuardRedirecting || isLoading) {
    return <GroupLoader />
  }

  // If the group doesn't exist, we display a 404 page
  if (!group) {
    return <GroupNotFound />
  }

  return (
    <div className="p-4 md:p-8">
      {!authenticatedUser && <StepsDisplay currentStep={1} />}

      <Title
        title={
          <Trans>
            {group?.administrator?.name} vous a invité à rejoindre le groupe{' '}
            <span className="text-violet-900">{group?.name}</span>
          </Trans>
        }
        subtitle={
          <Trans>
            Rejoignez le groupe{' '}
            <span className="text-violet-900">{group?.name}</span> et passez le
            test.
          </Trans>
        }
      />

      <InvitationForm group={group} />

      <LaconicRanking group={group} />
    </div>
  )
}
