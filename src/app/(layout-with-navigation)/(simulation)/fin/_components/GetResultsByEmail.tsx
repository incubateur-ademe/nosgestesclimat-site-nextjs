'use client'

import Trans from '@/components/translation/Trans'
import {
  LIST_MAIN_NEWSLETTER,
  LIST_NOS_GESTES_TRANSPORT_NEWSLETTER,
} from '@/constants/brevo'
import { endClickSaveSimulation } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import TextInputGroup from '@/design-system/inputs/TextInputGroup'
import Card from '@/design-system/layout/Card'
import Emoji from '@/design-system/utils/Emoji'
import { useGetNewsletterSubscriptions } from '@/hooks/settings/useGetNewsletterSubscriptions'
import { useSaveSimulation } from '@/hooks/simulation/useSaveSimulation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useNumberSubscribers } from '@/hooks/useNumberSubscriber'
import { useCurrentSimulation, useUser } from '@/publicodes-state'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { formatValue } from 'publicodes'
import { SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import Confirmation from './getResultsByEmail/Confirmation'

type Inputs = {
  name: string
  email?: string
  'newsletter-saisonniere': boolean
  'newsletter-transports': boolean
}

export default function GetResultsByEmail({
  className,
}: {
  className?: string
}) {
  const { t } = useClientTranslation()
  const { user, updateEmail } = useUser()

  const currentSimulation = useCurrentSimulation()

  const { data: newsletterSubscriptions } = useGetNewsletterSubscriptions(
    user?.email ?? ''
  )

  const isSubscribedMainNewsletter =
    !newsletterSubscriptions?.includes(LIST_MAIN_NEWSLETTER)
  const isSubscribedTransportNewsletter = !newsletterSubscriptions?.includes(
    LIST_NOS_GESTES_TRANSPORT_NEWSLETTER
  )

  const { register, handleSubmit } = useReactHookForm<Inputs>({
    defaultValues: {
      name: user?.name,
    },
  })

  const { saveSimulation, isPending, isSuccess, isError, error } =
    useSaveSimulation()

  const { data: numberSubscribers } = useNumberSubscribers()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
      listIds: [
        ...(data['newsletter-saisonniere'] ? [LIST_MAIN_NEWSLETTER] : []),
        ...(data['newsletter-transports']
          ? [LIST_NOS_GESTES_TRANSPORT_NEWSLETTER]
          : []),
      ],
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
        onSubmit={handleSubmit(onSubmit)}>
        <h3 className="flex items-center text-base sm:text-lg">
          <Trans>
            Vous souhaitez recevoir vos résultats d’empreinte carbone ?
          </Trans>

          <Emoji>💡</Emoji>
        </h3>

        <p className="text-sm sm:text-base">
          <Trans>Pour cela,</Trans>{' '}
          <strong className="text-primary-700">
            <Trans>laissez-nous votre email,</Trans>{' '}
          </strong>
          {t('comme {{numberSubscribers}} personnes.', {
            numberSubscribers: formatValue(numberSubscribers) ?? '---',
          })}
        </p>

        <div className="mb-4 flex w-full flex-col gap-4">
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

          {newsletterSubscriptions &&
            (!isSubscribedMainNewsletter ||
              !isSubscribedTransportNewsletter) && (
              <p className="mb-0">
                <Trans>
                  Recevez des conseils pour réduire votre empreinte :
                </Trans>
              </p>
            )}

          {newsletterSubscriptions && !isSubscribedMainNewsletter && (
            <CheckboxInputGroup
              label={
                <span>
                  <Emoji>☀️</Emoji>{' '}
                  <Trans>
                    <strong>Infolettre saisonnière de Nos Gestes Climat</strong>
                  </Trans>
                </span>
              }
              {...register('newsletter-saisonniere')}
            />
          )}

          {newsletterSubscriptions && !isSubscribedTransportNewsletter && (
            <CheckboxInputGroup
              label={
                <span>
                  <Emoji>🚗</Emoji>{' '}
                  <Trans>
                    <strong>Nos Gestes Transports</strong> : maîtrisez l'impact
                    carbone de vos transports avec nos 4 infolettres
                  </Trans>
                </span>
              }
              {...register('newsletter-transports')}
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-auto items-start">
          <Trans>Envoyer</Trans>
        </Button>

        {isError && (
          <div className="mt-4 text-red-600">{error?.toString()}</div>
        )}
      </form>
    </Card>
  )
}
