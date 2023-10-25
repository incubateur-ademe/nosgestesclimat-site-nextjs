'use client'

import Trans from '@/components/translation/Trans'
import { matomoSaveSimulationByGivingEmail } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Separator from '@/design-system/layout/Separator'
import { useSubscribeUser } from '@/hooks/useSubscribeUser'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { useState } from 'react'
import Confirmation from '../../fin-v2/_components/getResultsByEmail/Confirmation'
import Text from './Text'

export const NewsletterForm = () => {
  const { getCurrentSimulation } = useUser()
  const simulation = getCurrentSimulation()

  const [email, setEmail] = useState('')
  const [optIn, setOptIn] = useState(false)

  const {
    mutate: subscribeUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSubscribeUser()

  return (
    <div id="newsletter-form-container" className="mx-auto mb-4 max-w-lg">
      <Separator className="my-4" />
      <div>
        {isSuccess ? (
          <Confirmation />
        ) : (
          <form
            id="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (isLoading || !simulation) return

              trackEvent(matomoSaveSimulationByGivingEmail)

              subscribeUser({ simulation, email, optIn })
            }}>
            <Text />
            <TextInputGroup
              name="EMAIL"
              type="email"
              label="Entrez votre adresse email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              className="mb-4"
            />
            <CheckboxInputGroup
              name="OPT_IN"
              value={optIn}
              onChange={() => setOptIn((prevOptIn) => !prevOptIn)}
              required
              label={
                <>
                  J'accepte de recevoir des informations de la part de Nos
                  Gestes Climat et sa{' '}
                  <a
                    target="_blank"
                    href="https://nosgestesclimat.fr/vie-privée"
                    rel="noreferrer"
                    aria-label={
                      'politique de confidentialité, nouvelle fenêtre'
                    }>
                    politique de confidentialité
                  </a>
                </>
              }
              className="mb-4"
            />

            <p className="text-xs text-gray-500">
              <Trans>
                Vous pourrez choisir de ne plus recevoir nos emails à tout
                moment
              </Trans>
            </p>

            <Button onClick={() => null} type="submit" disabled={isLoading}>
              <Trans>Envoyer</Trans>
            </Button>
            <input
              type="text"
              name="email_address_check"
              value=""
              className="invisible"
              readOnly
            />
            <input type="hidden" name="locale" value="en" readOnly />
            <input type="hidden" name="html_type" value="simple" readOnly />
            {isError && (
              <div className="mt-4 text-red-600">{error?.toString()}</div>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
