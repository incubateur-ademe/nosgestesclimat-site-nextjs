'use client'

import AuthenticateUserForm from '@/components/AuthenticateUserForm'
import GroupLoader from '@/components/groups/GroupLoader'
import GroupNotFound from '@/components/groups/GroupNotFound'
import StepsDisplay from '@/components/groups/StepsDisplay'
import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import { useCurrentSimulation } from '@/publicodes-state'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import LaconicRanking from '../_components/LaconicRanking'
import { useSaveParticipation } from '../_hooks/useSaveParticipation'
import { useSetupPage } from '../_hooks/useSetupPage'

export default function RejoindreGroupeEmailPage() {
  const [email, setEmail] = useState<string | undefined>(undefined)

  const {
    isGuardInit,
    isGuardRedirecting,
    group,
    isLoading,
    authenticatedUser,
  } = useSetupPage()

  const guestName = useSearchParams().get('guestName') ?? ''

  const { handleSaveParticipation } = useSaveParticipation({
    groupId: group?.id ?? '',
  })

  const currentSimulation = useCurrentSimulation()

  const hasCompletedTest = currentSimulation.progression === 1

  // User shouldn't be able to access this page if they are authenticated
  if (authenticatedUser) {
    redirect('/amis/invitation/votre-nom')
  }

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
      <StepsDisplay currentStep={2} />

      <Title
        title={
          <Trans>
            {group?.administrator?.name} vous a invité à rejoindre le groupe{' '}
            <span className="text-violet-900">{group?.name}</span>
          </Trans>
        }
        subtitle={
          <Trans>
            Retrouvez vos résultats à tout moment sur votre espace personnel
          </Trans>
        }
      />

      <AuthenticateUserForm
        inputLabel={
          <p className="mb-0 flex w-full justify-between">
            <span className="inline-block">
              <Trans>Entrez votre email pour sauvegarder vos résultats</Trans>
            </span>{' '}
            <span className="text-secondary-700 inline-block font-bold italic">
              <Trans>facultatif</Trans>
            </span>
          </p>
        }
        required={false}
        buttonLabel={
          email ? (
            <Trans>Vérifier mon email</Trans>
          ) : hasCompletedTest ? (
            <Trans>Rejoindre</Trans>
          ) : (
            <Trans>Rejoindre et passer mon test</Trans>
          )
        }
        onComplete={(email) => {
          console.log('email', email)
          handleSaveParticipation({
            guestName: guestName,
            guestEmail: email ?? '',
          })
        }}
        onEmailEmpty={() => setEmail(undefined)}
        onEmailEntered={(email) => setEmail(email)}
      />

      <LaconicRanking group={group} />
    </div>
  )
}
