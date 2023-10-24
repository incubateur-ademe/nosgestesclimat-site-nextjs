'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Card from '@/design-system/layout/Card'
import { useSubscribeUser } from '@/hooks/useSubscribeUser'
import { useUser } from '@/publicodes-state'
import { useState } from 'react'
import Confirmation from './_components/Confirmation'

export default function GetResultsByEmail() {
  const [email, setEmail] = useState('')

  const { getCurrentSimulation } = useUser()

  const simulation = getCurrentSimulation()

  const {
    mutate: subscribeUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSubscribeUser()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isLoading || !simulation) return

    subscribeUser({
      simulation,
      email,
      optIn: true,
    })
  }

  if (isSuccess) return <Confirmation />

  return (
    <Card className="mb-4 items-center border-none bg-grey-100 py-8">
      <form id="newsletter-form" onSubmit={handleSubmit}>
        <h3 className="text-xl">
          <Trans>
            Recevez vos résultats{' '}
            <span className="text-pink-500">par email</span>
          </Trans>
        </h3>

        <p className="text-gray-600">
          Et des conseils pour réduire votre impact sur le climat.
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
          disabled={isLoading}
          className="mt-8">
          <Trans>Envoyer</Trans>
        </Button>

        {isError && (
          <div className="mt-4 text-red-600">{error?.toString()}</div>
        )}
      </form>
    </Card>
  )
}
