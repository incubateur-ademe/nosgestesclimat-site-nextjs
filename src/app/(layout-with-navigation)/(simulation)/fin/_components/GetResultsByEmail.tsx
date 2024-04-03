'use client'

import Trans from '@/components/translation/Trans'
import { matomoSaveSimulationByGivingEmail } from '@/constants/matomo'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
import { useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { formatValue } from 'publicodes'
import { twMerge } from 'tailwind-merge'
import Confirmation from './getResultsByEmail/Confirmation'

export default function GetResultsByEmail({
  className,
}: {
  className?: string
}) {
  const { user, updateEmail, getCurrentSimulation, updateCurrentSimulation } =
    useUser()

  const currentSimulation = getCurrentSimulation()

  const { saveSimulation, isPending, isSuccess, isError, error } =
    useSaveSimulation()

  const { data: numberSubscribers } = useNumberSubscribers()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!currentSimulation) {
      return // TODO: should throw an error
    }

    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    trackEvent(matomoSaveSimulationByGivingEmail)

    // We save the simulation (and signify the backend to send the email)
    await saveSimulation({
      simulation: {
        ...currentSimulation,
        savedViaEmail: true,
      },
      shouldSendSimulationEmail: true,
    })

    // We update the simulation to signify that it has been saved (and not show the form anymore)
    updateCurrentSimulation({ savedViaEmail: true })
  }

  // If we successfully saved the simulation, we display the confirmation message
  if (isSuccess) {
    return <Confirmation className={className} />
  }

  // If the simulation is already saved, we display the confirmation message
  if (currentSimulation?.savedViaEmail) {
    return <Confirmation className={className} />
  }

  return (
    <Card
      id="email-block"
      className={twMerge(
        'items-start border-none bg-grey-100 py-4',
        className
      )}>
      <form id="newsletter-form" onSubmit={handleSubmit}>
        <h3 className="text-base sm:text-lg md:text-lg">
          <Trans>
            Vous souhaitez recevoir vos résultats d’empreinte carbone ?
          </Trans>

          <Emoji>💡</Emoji>
        </h3>

        <p className="text-sm text-gray-600 sm:text-base">
          <Trans>
            Pour cela, <strong>laissez-nous votre email</strong>, comme{' '}
            {formatValue(numberSubscribers) ?? '---'} personnes.
          </Trans>
        </p>

        <p className="text-sm text-gray-600 sm:text-base">
          <Trans>
            Vous retrouverez votre résultat d’empreinte, ainsi que{' '}
            <strong>des conseils pour la réduire</strong> (1 fois par mois max.)
          </Trans>
        </p>

        <div className="mb-4">
          <TextInputGroup
            name="EMAIL"
            type="email"
            aria-label="Entrez votre adresse email"
            placeholder="jeanmarc@nosgestesclimat.fr"
            value={user?.email}
            onChange={(event) => {
              updateEmail((event.target as HTMLInputElement).value)
            }}
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

        <Button type="submit" disabled={isPending} className="mt-4">
          <Trans>Envoyer</Trans>
        </Button>

        {isError && (
          <div className="mt-4 text-red-600">{error?.toString()}</div>
        )}
      </form>
    </Card>
  )
}
