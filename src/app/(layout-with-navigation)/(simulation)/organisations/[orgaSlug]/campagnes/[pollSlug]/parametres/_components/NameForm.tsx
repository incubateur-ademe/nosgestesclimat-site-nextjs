import ModificationSaved from '@/components/messages/ModificationSaved'
import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useAutoFlick } from '@/hooks/utils/useAutoFlick'
import { useForm as useReactHookForm } from 'react-hook-form'

type Props = {
  nameValue: string
  updatePoll: ({ name }: { name: string }) => Promise<void>
  refetchPoll: () => void
}

export default function NameForm({
  nameValue,
  updatePoll,
  refetchPoll,
}: Props) {
  const { value, flick } = useAutoFlick()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
  } = useReactHookForm({
    defaultValues: {
      name: nameValue,
    },
  })

  async function onSubmit(data: { name: string }) {
    try {
      await updatePoll({
        name: data.name,
      })
      refetchPoll()
      flick()
    } catch (error) {
      setError('name', {
        type: 'manual',
        message: 'Une erreur est survenue',
      })
    }
  }

  return (
    <form
      onSubmit={
        isDirty
          ? handleSubmit(onSubmit)
          : (e) => {
              e.preventDefault()
            }
      }>
      <div className="relative w-full max-w-[30rem] pb-4">
        <TextInputGroup
          containerClassName="max-w-[30rem]"
          label={
            <span className="text-lg font-medium">
              <Trans>Nom de la campagne</Trans>
            </span>
          }
          value={nameValue}
          error={errors.name?.message}
          {...register('name', { required: 'Ce champ est requis' })}
        />

        <ModificationSaved shouldShowMessage={value} />
      </div>

      <div>
        <Button type="submit" aria-disabled={!isDirty}>
          Enregistrer
        </Button>
      </div>
    </form>
  )
}
