import Trans from '@/components/translation/Trans'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useForm as useReactHookForm } from 'react-hook-form'

export default function PollForm() {
  const { register, handleSubmit } = useReactHookForm()

  function onSubmit() {
    console.log('Submitted')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInputGroup
        label={<Trans>Nom de la campagne</Trans>}
        {...register('name')}
      />
    </form>
  )
}
