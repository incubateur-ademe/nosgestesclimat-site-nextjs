import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useForm as useReactHookForm } from 'react-hook-form'

type Props = {
  nameValue: string
  updatePoll: ({ name }: { name: string }) => Promise<void>
}

export default function NameForm({ nameValue, updatePoll }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    } catch (error) {
      setError('name', {
        type: 'manual',
        message: 'Une erreur est survenue',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-end gap-4">
      <TextInputGroup
        containerClassName="max-w-[30rem]"
        label={<Trans>Nom de la campagne</Trans>}
        value={nameValue}
        error={errors.name?.message}
        {...register('name', { required: 'Ce champ est requis' })}
      />

      <Button className="mb-2" type="submit">
        Enregistrer
      </Button>
    </form>
  )
}
