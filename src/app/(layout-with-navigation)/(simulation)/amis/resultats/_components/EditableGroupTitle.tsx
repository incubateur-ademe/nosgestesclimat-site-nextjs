'use client'

import {
  amisDashboardOpenEditName,
  amisDashboardValidateEditName,
} from '@/constants/tracking/pages/amisDashboard'
import Button from '@/design-system/inputs/Button'
import InlineTextInput from '@/design-system/inputs/InlineTextInput'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { useIsGroupOwner } from '@/hooks/groups/useIsGroupOwner'
import { useUpdateGroup } from '@/hooks/groups/useUpdateGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { Group } from '@/types/groups'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import Image from 'next/image'
import { useState } from 'react'

export default function EditableGroupTitle({ group }: { group: Group }) {
  const formattedGroupId = group?._id?.replaceAll('/', '')

  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { t } = useClientTranslation()

  const { mutate: updateGroup } = useUpdateGroup()

  const { isGroupOwner } = useIsGroupOwner({ group })

  const handleSubmit = async (groupNameUpdated: string) => {
    setIsSubmitting(true)
    try {
      updateGroup({
        groupId: formattedGroupId,
        name: groupNameUpdated,
      })

      setIsSubmitting(false)
      setIsEditingTitle(false)
    } catch (e) {
      captureException(e)
    }
  }

  return (
    <>
      <div className="my-4">
        {isEditingTitle ? (
          <InlineTextInput
            defaultValue={group?.name}
            label={t('Modifier le nom du groupe')}
            name="group-name-input"
            onClose={() => {
              setIsEditingTitle(false)
              trackEvent(amisDashboardValidateEditName)
            }}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            data-cypress-id="group-edit-input-name"
          />
        ) : (
          <Title
            data-cypress-id="group-name"
            className="text-xl md:text-2xl"
            title={
              <span className="flex items-center justify-between">
                <span>
                  <Emoji>{group?.emoji}</Emoji> <span>{group?.name}</span>
                </span>

                {isGroupOwner ? (
                  <Button
                    className="!p-1"
                    onClick={() => {
                      setIsEditingTitle(true)
                      trackEvent(amisDashboardOpenEditName)
                    }}
                    color="secondary"
                    data-cypress-id="group-name-edit-button">
                    <Image
                      src="/images/misc/pencil.svg"
                      alt={t(
                        'Modifier le nom du groupe, ouvre un champ de saisie automatiquement focalisé'
                      )}
                      width={24}
                      height={24}
                    />
                  </Button>
                ) : null}
              </span>
            }
            subtitle={t('Créé par {{name}}', {
              name: isGroupOwner ? t('vous') : group?.administrator?.name,
            })}
          />
        )}
      </div>
    </>
  )
}
