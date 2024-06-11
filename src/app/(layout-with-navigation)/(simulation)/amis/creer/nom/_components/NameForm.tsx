'use client'

import Trans from '@/components/translation/Trans'
import { GROUP_EMOJIS } from '@/constants/group'
import Button from '@/design-system/inputs/Button'
import GridRadioInputs from '@/design-system/inputs/GridRadioInputs'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'
import { GroupCreationContext } from '../../_contexts/GroupCreationContext'

type Inputs = {
  name: string
  emoji: string
}

export default function NameForm() {
  const { t } = useClientTranslation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useReactHookForm<Inputs>()

  const router = useRouter()

  const { updateGroup } = useContext(GroupCreationContext)

  function onSubmit({ name, emoji }: { name: string; emoji: string }) {
    updateGroup({ name, emoji })

    router.push('/amis/creer/vos-informations')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInputGroup
        label={<Trans>Choisissez un nom pour ce groupe</Trans>}
        helperText={
          <Trans>Pour le retrouver facilement dans votre liste</Trans>
        }
        error={errors.name?.message}
        {...register('name', {
          required: t('Ce champ est obligatoire.'),
          maxLength: { value: 50, message: t('Ce champ est trop long') },
        })}
      />

      <GridRadioInputs
        control={control as any}
        label={<Trans>Et une illustration</Trans>}
        helperText={<Trans>Pour faire joli et le reconnaitre !</Trans>}
        name="emoji"
        items={GROUP_EMOJIS.map((emoji) => ({ value: emoji, label: emoji }))}
        rules={{ required: t('Ce champ est obligatoire.') }}
        error={errors.emoji?.message}
      />

      <Button type="submit" className="mt-4 self-start">
        <Trans>Continuer</Trans>
      </Button>
    </form>
  )
}
