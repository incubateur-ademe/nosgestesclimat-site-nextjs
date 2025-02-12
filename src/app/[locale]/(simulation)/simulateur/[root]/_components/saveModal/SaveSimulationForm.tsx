import Trans from '@/components/translation/Trans'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Title from '@/design-system/layout/Title'
import type { ReactNode } from 'react'
import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

type Inputs = {
  email?: string
}

export default function SaveSimulationForm({
  handleSubmit,
  onSubmit,
  register,
  isError,
  title,
}: {
  handleSubmit: UseFormHandleSubmit<Inputs>
  onSubmit: SubmitHandler<Inputs>
  register: UseFormRegister<Inputs>
  isError: boolean
  title: ReactNode | string
}) {
  return (
    <form
      id="save-form"
      className="flex h-full flex-col items-start"
      onSubmit={handleSubmit(onSubmit)}>
      <Title
        tag="h2"
        subtitle={
          <Trans locale={locale}>
            Recevez par email un lien pour reprendre votre test plus tard.
          </Trans>
        }>
        {title}
      </Title>

      <div className="flex w-full flex-col items-start gap-4">
        <TextInputGroup
          required
          type="email"
          aria-label="Entrez votre adresse email"
          data-cypress-id="save-modal-email-input"
          {...register('email')}
        />

        {isError && (
          <p className="mt-4 text-sm text-red-700">
            <Trans locale={locale}>
              Une erreur s'est produite au moment de la sauvegarde.
            </Trans>
          </p>
        )}
      </div>
    </form>
  )
}
