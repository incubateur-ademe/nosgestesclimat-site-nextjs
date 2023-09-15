import { matomoEventUpdateGroupName } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import InlineTextInput from '@/design-system/inputs/InlineTextInput'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { captureException } from '@sentry/react'
import Image from 'next/image'
import { useState } from 'react'
import { useFetchGroup } from '../../_hooks/useFetchGroup'
import { useUpdateGroupName } from '../_hooks/useUpdateGroupName'

export default function EditableGroupTitle({ groupId }: { groupId: string }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { t } = useClientTranslation()

  const { data: group, refetch } = useFetchGroup(groupId as string)

  const { mutate: updateGroupName } = useUpdateGroupName()

  const handleSubmit = async (groupNameUpdated: string) => {
    setIsSubmitting(true)
    try {
      updateGroupName({
        groupId: groupId as string,
        groupName: groupNameUpdated,
      })

      refetch()

      setIsSubmitting(false)
      setIsEditingTitle(false)

      trackEvent(matomoEventUpdateGroupName)
    } catch (e) {
      captureException(e)
    }
  }

  return (
    <>
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
                  src="/images/misc/pencil.svg"
                  alt={t(
                    'Modifier le nom du groupe, ouvre un champ de saisie automatiquement focalisé'
                  )}
                />
              </Button>
            </span>
          }
        />
      )}
    </>
  )
}
