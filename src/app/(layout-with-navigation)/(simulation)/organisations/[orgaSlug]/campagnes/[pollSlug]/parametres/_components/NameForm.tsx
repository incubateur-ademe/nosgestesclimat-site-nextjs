import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { UpdatePollProps } from '@/types/organisations'
import { useEffect } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

type Props = {
  nameValue: string
  updatePoll: ({ name }: UpdatePollProps) => void
  updatePollStatus: string
}

export default function NameForm({
  nameValue,
  updatePoll,
  updatePollStatus,
}: Props) {
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
    updatePoll({
      name: data.name,
    })
  }

  useEffect(() => {
    if (updatePollStatus === 'error') {
      setError('name', {
        type: 'manual',
        message: 'Une erreur est survenue',
      })
    } else {
      setError('name', {
        type: 'manual',
        message: '',
      })
    }
  }, [updatePollStatus, setError])

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
      </div>

      <div>
        <Button type="submit" aria-disabled={!isDirty}>
          Enregistrer
        </Button>
      </div>
    </form>
  )
}
