import TransClient from '@/components/translation/TransClient'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import { useSubscribeUser } from '@/hooks/useSubscribeUser'
import { useUser } from '@/publicodes-state'
import { useState } from 'react'
import Confirmation from './newsletterForm/Confirmation'
import Text from './newsletterForm/Text'

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
  } = useSubscribeUser()

  return (
    <div id="newsletter-form-container" className="max-w-lg mx-auto">
      <div>
        {isSuccess ? (
          <Confirmation />
        ) : (
          <form
            id="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (isLoading) return
              subscribeUser({ simulation, email, optIn })
            }}>
            <Text />
            <TextInputGroup
              name="EMAIL"
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
              <TransClient>
                Vous pourrez choisir de ne plus recevoir nos emails à tout
                moment
              </TransClient>
            </p>
            {isError && (
              <div className="text-red-600 text-xs">
                Une erreur est survenue
              </div>
            )}

            <Button onClick={() => null} type="submit" disabled={isLoading}>
              <TransClient>Envoyer</TransClient>
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
          </form>
        )}
      </div>
    </div>
  )
}
