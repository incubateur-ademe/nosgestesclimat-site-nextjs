'use client'

import Trans from '@/components/translation/trans/TransClient'
import TextInput from '@/design-system/inputs/TextInput'
import Title from '@/design-system/layout/Title'
import type { ReactNode } from 'react'
import type {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

interface Inputs {
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
          <Trans>
            Recevez par e-mail un lien pour reprendre votre test plus tard.
          </Trans>
        }>
        {title}
      </Title>

      <div className="flex w-full flex-col items-start gap-4">
        <TextInput
          required
          type="email"
          autoComplete="email"
          aria-label="Entrez votre adresse e-mail"
          data-cypress-id="save-modal-email-input"
          aria-describedby={isError ? 'save-error' : undefined}
          aria-invalid={isError ? 'true' : 'false'}
          {...register('email')}
        />

        {isError && (
          <p id="save-error" className="mt-4 text-sm text-red-800" role="alert">
            <Trans>Une erreur s'est produite au moment de la sauvegarde.</Trans>
          </p>
        )}
      </div>
    </form>
  )
}
