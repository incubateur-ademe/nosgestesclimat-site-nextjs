'use client'

import { GROUP_URL } from '@/constants/urls'

import { captureException } from '@sentry/react'
import { useEffect, useRef, useState } from 'react'

import Meta from '@/components/misc/Meta'
import Button from '@/design-system/inputs/Button'
import GoBackLink from '@/design-system/inputs/GoBackLink'
import InlineTextInput from '@/design-system/inputs/InlineTextInput'
import Title from '@/design-system/layout/Title'
import AutoCanonicalTag from '@/design-system/utils/AutoCanonicalTag'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useEngine, useUser } from '@/publicodes-state'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { fetchUpdateGroupMember } from '../_helpers/fetchUpdateGroupMember'
import { getSimulationResults } from '../_helpers/getSimulationResults'
import Classement from './_components/Classement'
import FeedbackBlock from './_components/FeedbackBlock'
import Footer from './_components/Footer'
import InviteBlock from './_components/InviteBlock'
import PointsFortsFaibles from './_components/PointsFortsFaibles'
import VotreEmpreinte from './_components/VotreEmpreinte'
import { useGetGroupStats } from './_hooks/useGetGroupStats'

import pencilIcon from '@/assets/images/pencil.svg'
import TransClient from '@/components/translation/TransClient'
import { matomoEventUpdateGroupName } from '@/constants/matomo'
import Separator from '@/design-system/layout/Separator'
import { Results } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'

export default function GroupResultsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSynced, setIsSynced] = useState(false)

  const { getValue } = useEngine()

  const { groupId } = searchParams

  const router = useRouter()

  const { data: group, refetch } = useQuery(
    ['group'],
    () =>
      axios
        .get(`${GROUP_URL}/${groupId}`)
        .then(({ data }) => data)
        .catch((e) => captureException(e)),
    {
      enabled: !!groupId,
    }
  )

  const { mutate: updateGroupName } = useMutation({
    mutationFn: (groupName: string) =>
      axios.post(GROUP_URL + '/update', {
        _id: groupId,
        name: groupName,
      }),
  })

  const { t } = useClientTranslation()

  const { user, getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  const userId = user?.id

  const intervalRef = useRef<NodeJS.Timeout>()

  const results: Results | null = useGetGroupStats({
    groupMembers: group?.members,
    userId: userId || '',
    isSynced,
  })

  const resultsOfUser = getSimulationResults({
    getValue,
  })

  // If the user has a simulation we update the group accordingly
  // This is flaky and should incorporate a failsafe to ensure we do not update ad aeternam
  useEffect(() => {
    const currentMember = group?.members.find(
      (groupMember: { userId: string }) => groupMember.userId === userId
    )
    if (group && currentMember && currentSimulation) {
      if (resultsOfUser?.total !== currentMember?.results?.total) {
        fetchUpdateGroupMember({
          group,
          userId: userId ?? '',
          simulation: currentSimulation,
          results: resultsOfUser,
        }).then(() => refetch())
      } else {
        setIsSynced(true)
      }
    }
  }, [group, userId, resultsOfUser, currentSimulation, refetch])

  useEffect(() => {
    if (groupId && !group) {
      intervalRef.current = setInterval(() => refetch(), 60000)
    }
  }, [groupId, group, userId, refetch])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleSubmit = async (groupNameUpdated: string) => {
    setIsSubmitting(true)
    try {
      updateGroupName(groupNameUpdated)

      refetch()

      setIsSubmitting(false)
      setIsEditingTitle(false)

      trackEvent(matomoEventUpdateGroupName)
    } catch (e) {
      captureException(e)
    }
  }

  if (!groupId) {
    router.push('/groupes')
  }

  if (!group) {
    return null
  }

  if (
    !group?.members?.some(
      (member: { userId: string }) => member.userId === userId
    )
  ) {
    return router.push(`/groupes/invitation?groupId=${group._id}`)
  }

  return (
    <>
      <div className="p-4 pb-0">
        <GoBackLink className="mb-4 font-bold" />
        <Meta
          title={t('Mon groupe, nos bilans carbone personnels')}
          description={t(
            "Calculez votre empreinte carbone en groupe et comparez la avec l'empreinte de vos proches grâce au simulateur de bilan carbone personnel Nos Gestes Climat."
          )}
        />
        <AutoCanonicalTag />
        {isEditingTitle ? (
          <InlineTextInput
            defaultValue={group?.name}
            label={t('Modifier le nom du groupe')}
            name="group-name-input"
            onClose={() => setIsEditingTitle(false)}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            data-cypress-id="group-edit-input-name"
          />
        ) : (
          <Title
            data-cypress-id="group-name"
            title={
              <span className="flex items-center justify-between">
                <span>
                  <span>{group?.emoji}</span> <span>{group?.name}</span>
                </span>
                <Button
                  className="!p-1"
                  onClick={() => setIsEditingTitle(true)}
                  color="secondary"
                  data-cypress-id="group-name-edit-button">
                  <Image
                    src={pencilIcon}
                    alt={t(
                      'Modifier le nom du groupe, ouvre un champ de saisie automatiquement focalisé'
                    )}
                  />
                </Button>
              </span>
            }
          />
        )}

        <FeedbackBlock />

        <div className="mt-4">
          <h2 className="m-0 text-lg font-bold">
            <TransClient>Le classement</TransClient>
          </h2>
        </div>

        <Classement group={group} />

        <InviteBlock group={group} />

        {group?.members?.length > 1 ? (
          <>
            <Separator className="my-8" />
            <PointsFortsFaibles
              pointsFaibles={results?.pointsFaibles}
              pointsForts={results?.pointsForts}
            />
            <Separator className="mb-6 mt-10" />
          </>
        ) : (
          <Separator className="mb-6 mt-8" />
        )}

        <VotreEmpreinte
          categoriesFootprints={
            results?.userFootprintByCategoriesAndSubcategories
          }
          membersLength={group?.members?.length}
        />
      </div>
      <Footer />
    </>
  )
}
