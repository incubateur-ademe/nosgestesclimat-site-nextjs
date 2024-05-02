// NOT USED FOR NOW

'use client'

import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import EmailInput from '@/design-system/inputs/EmailInput'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'

import { useIframe } from '@/hooks/useIframe'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { isEmailValid } from '@/utils/isEmailValid'
import { useState } from 'react'

export default function SaveViaEmail() {
  const { user, updateEmail } = useUser()

  const [email, setEmail] = useState(user.email ?? '')

  const [error, setError] = useState('')

  const currentSimulation = useCurrentSimulation()

  const { saveSimulation, isPending, isSuccess, isError } = useSaveSimulation()

  // We do not display the component if we are in an iframeSimulation context
  const { isIframeOnlySimulation } = useIframe()
  if (isIframeOnlySimulation) return null

  return (
    <div className="mx-auto mb-4 rounded-lg bg-primary-100 p-4 text-center">
      <p>
        <Trans>
          Recevez un email avec un lien pour terminer votre test plus tard
        </Trans>
      </p>
      {isSuccess ? (
        <p>
          <Trans>Bravo champion·ne !</Trans>
        </p>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            if (isPending) {
              return
            }

            if (!isEmailValid(email)) {
              setError('Adresse email invalide')
              return
            }

            updateEmail(email)

            saveSimulation({
              simulation: {
                ...currentSimulation,
                savedViaEmail: true,
              },
              shouldSendSimulationEmail: true,
            })
          }}>
          <EmailInput
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            className="bg-white"
          />
          <Button disabled={isPending}>
            <Trans>Valider</Trans>
          </Button>
          {isSuccess && 'success'}
          {isError && 'error'}
        </form>
      )}
    </div>
  )
}
