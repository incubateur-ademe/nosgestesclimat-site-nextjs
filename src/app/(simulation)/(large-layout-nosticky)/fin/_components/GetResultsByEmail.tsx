'use client'

import Trans from '@/components/translation/Trans'
import { endClickSaveSimulation } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useUser } from '@/publicodes-state'
import { formatEmail } from '@/utils/format/formatEmail'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form';
import { useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Confirmation from './carbone/getResultsByEmail/Confirmation'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
  'newsletter-logement': boolean
}

export default function GetResultsByEmail({
  className,
}: {
  className?: string
}) {
  const { user, updateEmail } = useUser()
  const [loading] = useState(false)
  const [error] = useState(false)
  const [success] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useReactHookForm<Inputs>({
    defaultValues: {
      name: user?.name,
    },
    mode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // If the mutation is pending, we do nothing
    if (loading) {
      return
    }

    trackEvent(endClickSaveSimulation)

    const formattedEmail = formatEmail(data.email)

    updateEmail(formattedEmail)
  }

  // If we successfully saved the simulation, we display the confirmation message
  // or if the simulation is already saved
  if (success) {
    return <Confirmation className={className} />
  }

  // There is a padding/margin shenanigan here for the scroll
  return (
    <div id="email-block" className="-mt-40 pt-40">
      <Card
        className={twMerge(
          'rainbow-border items-start rounded-xl px-4 py-6 shadow-none',
          className
        )}>
        <form
          id="newsletter-form"
          className="flex h-full flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}>
          <h3 className="flex items-center text-base sm:text-lg">
            <Trans>Vous souhaitez des informations de notre part ?</Trans>

            <Emoji>💡</Emoji>
          </h3>

          <p className="text-sm sm:text-base">
            <Trans>Pour cela,</Trans>{' '}
            <strong className="text-primary-700">
              <Trans>laissez-nous votre email</Trans>
            </strong>
          </p>

          <div className="mb-4 flex w-full flex-col gap-2">
            <EmailInput
              {...register('email', {
                required: 'Veuillez renseigner un email.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Veuillez entrer une adresse email valide',
                },
              })}
              aria-label="Entrez votre adresse email"
              error={errors.email?.message}
              data-cypress-id="fin-email-input"
              className="mb-2"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-auto items-start"
            data-cypress-id="fin-email-submit-button">
            <Trans>Envoyer</Trans>
          </Button>

          {error && (
            <div className="mt-4 text-red-600">{error?.toString()}</div>
          )}
        </form>
      </Card>
    </div>
  )
}
