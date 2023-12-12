'use client'

import Trans from '@/components/translation/Trans'
import { matomoSaveSimulationByGivingEmail } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Card from '@/design-system/layout/Card'
import { useSubscribeUser } from '@/hooks/useSubscribeUser'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Confirmation from './getResultsByEmail/Confirmation'

export default function GetResultsByEmail({
  className,
}: {
  className?: string
}) {
  const [email, setEmail] = useState('')

  const { user, getCurrentSimulation, updateHasSavedSimulation } = useUser()

  const simulation = getCurrentSimulation()

  const {
    mutate: subscribeUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useSubscribeUser()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isPending || !simulation) return

    trackEvent(matomoSaveSimulationByGivingEmail)

    subscribeUser({
      simulation,
      email,
      optIn: true,
    })

    updateHasSavedSimulation(true)
  }

  if (isSuccess || user.hasSavedSimulation)
    return <Confirmation className={className} />

  return (
    <Card
      className={twMerge(
        'items-start border-none bg-grey-100 py-4',
        className
      )}>
      <form id="newsletter-form" onSubmit={handleSubmit}>
        <h3 className="text-lg md:text-xl">
          <Trans>
            Recevez vos résultats{' '}
            <span className="text-secondary">par email</span>
          </Trans>
        </h3>

        <p className="text-gray-600">
          Et les conseils de Nos Gestes Climat pour réduire votre impact sur le
          climat.
        </p>

        <div className="mb-4">
          <TextInputGroup
            name="EMAIL"
            type="email"
            aria-label="Entrez votre adresse email"
            placeholder="jeanmarc@nosgestesclimat.fr"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            className="bg-white"
          />
        </div>

        {/*
        // Commented until further work on the reminder feature
        <CheckboxInputGroup
          name="SEND_REMINDER"
          value={shouldSendReminder}
          onChange={() => setShouldSendReminder((prevValue) => !prevValue)}
          required
          size="lg"
          label={
            <span>
              Recevoir une <strong>alerte</strong> par email{' '}
              <strong>dans 6 mois</strong> pour comparer mes résultats
            </span>
          }
          className="mb-4"
        />

        */}

        <Button
          onClick={() => null}
          type="submit"
          disabled={isPending}
          className="mt-4">
          <Trans>Envoyer</Trans>
        </Button>

        {isError && (
          <div className="mt-4 text-red-600">{error?.toString()}</div>
        )}
      </form>
    </Card>
  )
}
