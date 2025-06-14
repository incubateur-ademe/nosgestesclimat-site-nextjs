'use client'

import DefaultSubmitErrorMessage from '@/components/error/DefaultSubmitErrorMessage'
import DownArrow from '@/components/icons/DownArrow'
import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import CheckboxInputGroup from '@/design-system/inputs/CheckboxInputGroup'
import Loader from '@/design-system/layout/Loader'
import Title from '@/design-system/layout/Title'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { sendDataToGoogleSheet } from '@/services/webhooks/google-sheet'
import dayjs from 'dayjs'
import { type ReactNode, useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

enum Inputs {
  data_privacy = 'data_privacy',
  only_result = 'only_result',
  'not_sure_about_gain' = 'not_sure_about_gain',
  'too_many_accounts' = 'too_many_accounts',
}

type InputValues = Record<Inputs, boolean>

export default function RefusedState({
  onAfterSend,
}: {
  onAfterSend: () => void
}) {
  const { t } = useClientTranslation()

  const [isPending, startTransition] = useTransition()

  const [error, setError] = useState<string | null>(null)
  const [hasSubmitError, setHasSubmitError] = useState<ReactNode | null>(null)

  const { register, handleSubmit, watch } = useForm<InputValues>()

  const onSubmit = (values: InputValues) => {
    startTransition(async () => {
      if (!Object.values(values).some((value) => !!value)) {
        setError(t('Veuillez sélectionner au moins une option'))
        return
      }

      setError(null)
      setHasSubmitError(null)

      const data = {
        date: `'${dayjs().format('YYYY-MM-DD')}`,
        time: `'${dayjs().format('HH:mm')}`,
        reasons: Object.entries(values)
          .reduce((resultArray, [currentKey, currentValue]) => {
            if (currentValue) {
              resultArray.push(currentKey)
            }

            return resultArray
          }, [] as string[])
          .join(', '),
      }

      try {
        await sendDataToGoogleSheet(data)
        onAfterSend()
      } catch (e) {
        setHasSubmitError(true)
      }
    })
  }

  const dataPrivacy = watch(Inputs.data_privacy)
  const onlyResult = watch(Inputs.only_result)
  const notSureAboutGain = watch(Inputs.not_sure_about_gain)
  const tooManyAccounts = watch(Inputs.too_many_accounts)

  useEffect(() => {
    if (
      error &&
      (dataPrivacy || onlyResult || notSureAboutGain || tooManyAccounts)
    ) {
      setError(null)
    }
  }, [dataPrivacy, onlyResult, notSureAboutGain, tooManyAccounts, error])

  return (
    <div data-testid="refused-state">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title
          tag="h2"
          className="text-lg font-bold"
          title={t('Merci pour votre réponse. Dites-nous en plus !')}
        />

        <p>
          <Trans>
            Pour nous aider à mieux cerner vos attentes, précisez pourquoi vous
            ne souhaitez pas créer de compte :
          </Trans>
        </p>

        <ul className="mb-8 flex flex-col gap-2">
          <li>
            <CheckboxInputGroup
              label={t(
                'Je ne veux pas que mes données personnelles soient stockées ou utilisées'
              )}
              data-testid="data-privacy-checkbox"
              {...register(Inputs.data_privacy)}
            />
          </li>
          <li>
            <CheckboxInputGroup
              label={t(
                'Je veux juste voir mes résultats et ne pas perdre de temps avec un compte'
              )}
              className="text-sm"
              data-testid="only-result-checkbox"
              {...register(Inputs.only_result)}
            />
          </li>
          <li>
            <CheckboxInputGroup
              label={t(
                "Je ne suis pas sûr que ça m'apporte vraiment quelque chose"
              )}
              data-testid="not-sure-checkbox"
              {...register(Inputs.not_sure_about_gain)}
            />
          </li>
          <li>
            <CheckboxInputGroup
              label={t(
                "J'ai déjà trop de comptes partout, je ne veux pas un de plus"
              )}
              data-testid="too-many-accounts-checkbox"
              {...register(Inputs.too_many_accounts)}
            />
          </li>
        </ul>

        {error && (
          <li className="mb-4 text-sm font-bold text-red-800">{error}</li>
        )}

        {hasSubmitError && (
          <DefaultSubmitErrorMessage className="mb-4 text-sm" />
        )}

        <div>
          <Button
            disabled={isPending}
            data-testid="send-button"
            className="min-w-[154px]">
            {isPending ? (
              <Loader size="sm" />
            ) : (
              <DownArrow aria-hidden="true" className="mr-2 w-6 -rotate-90" />
            )}

            <Trans>Envoyer</Trans>
          </Button>
        </div>
      </form>
    </div>
  )
}
