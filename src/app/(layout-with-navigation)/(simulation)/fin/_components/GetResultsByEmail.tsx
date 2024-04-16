'use client'

import { endClickSaveSimulation } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { formatValue } from 'publicodes'
import { twMerge } from 'tailwind-merge'
import Confirmation from './getResultsByEmail/Confirmation'

export default function GetResultsByEmail({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()

  const { user, updateEmail } = useUser()

  const currentSimulation = useCurrentSimulation()

  const { saveSimulation, isPending, isSuccess, isError, error } =
    useSaveSimulation()

  const { data: numberSubscribers } = useNumberSubscribers()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // If the mutation is pending, we do nothing
    if (isPending) {
      return
    }

    trackEvent(endClickSaveSimulation)

    // We save the simulation (and signify the backend to send the email)
    await saveSimulation({
      simulation: {
        ...currentSimulation,
        savedViaEmail: true,
      },
      shouldSendSimulationEmail: true,
    })

    // We update the simulation to signify that it has been saved (and not show the form anymore)
    currentSimulation.update({ savedViaEmail: true })
  }

  // If we successfully saved the simulation, we display the confirmation message
  // or if the simulation is already saved
  if (isSuccess || currentSimulation?.savedViaEmail) {
    return <Confirmation className={className} />
  }

  return (
    <Card
      id="email-block"
      className={twMerge(
        'rainbow-border items-start rounded-xl p-6 shadow-none',
        className
      )}>
      <form
        id="newsletter-form"
        className="flex h-full flex-col items-start"
        onSubmit={handleSubmit}>
        <h3 className="flex items-center text-base sm:text-lg">
          <NGCTrans>
            Vous souhaitez recevoir vos résultats d’empreinte carbone ?
          </NGCTrans>

          <Emoji>💡</Emoji>
        </h3>

        <p className="text-sm text-gray-600 sm:text-base">
          <NGCTrans>Pour cela,</NGCTrans>{' '}
          <strong>
            <NGCTrans>laissez-nous votre email,</NGCTrans>{' '}
          </strong>
          {t('comme {{numberSubscribers}} personnes.', {
            numberSubscribers: formatValue(numberSubscribers) ?? '---',
          })}
        </p>

        <p className="text-sm text-gray-600 sm:text-base">
          <NGCTrans>
            Vous retrouverez votre résultat d’empreinte, ainsi que
          </NGCTrans>{' '}
          <strong>
            <NGCTrans>des conseils pour la réduire</NGCTrans>
          </strong>{' '}
          <NGCTrans>(1 fois par mois max.)</NGCTrans>
        </p>

        <div className="mb-4 w-full">
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

        <Button
          type="submit"
          disabled={isPending}
          className="mt-auto items-start">
          <NGCTrans>Envoyer</NGCTrans>
        </Button>

        {isError && (
          <div className="mt-4 text-red-600">{error?.toString()}</div>
        )}
      </form>
    </Card>
  )
}
