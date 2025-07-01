'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import InlineLink from '@/design-system/inputs/InlineLink'
import Modal from '@/design-system/modals/Modal'
import type { CookieConsentChoices } from '@/types/cookies'
import { useForm } from 'react-hook-form'

type CookieFormData = {
  googleAds: 'accept' | 'refuse'
}

const Radio = ({ id, name, checked, disabled, label, ...props }: any) => (
  <label
    className={`inline-flex cursor-pointer items-center gap-2 select-none ${disabled ? 'opacity-50' : ''}`}
    htmlFor={id}>
    <input
      type="radio"
      id={id}
      name={name}
      checked={checked}
      disabled={disabled}
      className="peer sr-only"
      {...props}
    />
    <span
      className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 ${checked ? 'border-blue-800' : 'border-gray-300'} bg-white transition-colors duration-150`}>
      <span
        className={`absolute top-1/2 left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${checked ? 'bg-blue-800' : ''}`}></span>
    </span>
    <span className="text-sm font-medium text-gray-900 md:text-base">
      {label}
    </span>
  </label>
)

export default function CookieConsentManagement({
  isBoardOpen,
  closeSettings,
  refuseAll,
  acceptAll,
  confirmChoices,
}: {
  isBoardOpen: boolean
  closeSettings: () => void
  refuseAll: () => void
  acceptAll: () => void
  confirmChoices: (data: CookieConsentChoices) => void
}) {
  const { register, handleSubmit, watch, setValue } = useForm<CookieFormData>({
    defaultValues: {
      googleAds: 'accept',
    },
  })

  const googleAdsValue = watch('googleAds')

  const onSubmit = (data: CookieFormData) => {
    const choices: CookieConsentChoices = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === 'accept' ? true : false,
      ])
    ) as CookieConsentChoices
    confirmChoices(choices)
  }

  return (
    <Modal
      isOpen={isBoardOpen}
      closeModal={closeSettings}
      hasAbortCross={true}
      hasAbortButton={false}
      className="!w-3xl max-w-screen overflow-hidden !rounded-2xl !p-0 !shadow-2xl">
      <div className="mx-auto flex w-full max-w-3xl flex-col rounded-2xl bg-white p-0 shadow-2xl">
        <div className="flex items-center justify-between px-8 pt-8 pb-2">
          <h1 className="text-xl font-bold text-gray-900">
            <Trans i18nKey="cookies.management.title">
              Panneau de gestion des cookies
            </Trans>
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[50vh] flex-1 overflow-y-auto px-8 pb-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div>
                <span className="text-base font-medium text-gray-900">
                  <Trans i18nKey="cookies.management.preferences">
                    Préférences pour tous les services.{' '}
                  </Trans>
                </span>
                <InlineLink href="/politique-de-confidentialite#cookies">
                  <Trans i18nKey="cookies.management.privacyLink">
                    Données personnelles et cookies
                  </Trans>
                </InlineLink>
              </div>
              <div className="mb-8 flex flex-wrap gap-3 md:flex-nowrap">
                <Button
                  type="button"
                  color="secondary"
                  onClick={() => {
                    setValue('googleAds', 'refuse')
                    refuseAll()
                  }}
                  size="sm">
                  <Trans i18nKey="cookies.management.refuseAll">
                    Tout refuser
                  </Trans>
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={() => {
                    setValue('googleAds', 'accept')
                    acceptAll()
                  }}
                  size="sm">
                  <Trans i18nKey="cookies.management.acceptAll">
                    Tout accepter
                  </Trans>
                </Button>
              </div>
            </div>

            <fieldset className="mb-6 border-t border-gray-200">
              <legend className="mb-2 flex w-full flex-col flex-wrap justify-between gap-2 sm:flex-row sm:items-center">
                <span className="text-base font-bold whitespace-nowrap text-gray-900 md:text-lg">
                  <Trans i18nKey="cookies.management.required.title">
                    Cookies obligatoires
                  </Trans>
                </span>
                <div className="flex gap-6">
                  <Radio
                    id="oblig-accept"
                    name="oblig"
                    checked={true}
                    disabled
                    label={
                      <Trans i18nKey="cookies.management.accept">
                        Accepter
                      </Trans>
                    }
                  />
                  <Radio
                    id="oblig-refuse"
                    name="oblig"
                    checked={false}
                    disabled
                    label={
                      <Trans i18nKey="cookies.management.refuse">Refuser</Trans>
                    }
                  />
                </div>
              </legend>
              <p className="mt-2 text-base text-gray-700">
                <Trans i18nKey="cookies.management.required.description">
                  Ce site utilise des cookies nécessaires à son bon
                  fonctionnement qui ne peuvent pas être désactivés.
                </Trans>
              </p>
            </fieldset>

            <fieldset className="border-t border-gray-200">
              <legend className="mb-2 flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <span className="text-base font-bold whitespace-nowrap text-gray-900 md:text-lg">
                  <Trans i18nKey="cookies.management.googleAds.title">
                    Google Ads
                  </Trans>
                </span>
                <div className="flex gap-6">
                  <Radio
                    id="googleAds-accept"
                    value="accept"
                    checked={googleAdsValue === 'accept'}
                    label={
                      <Trans i18nKey="cookies.management.accept">
                        Accepter
                      </Trans>
                    }
                    {...register('googleAds')}
                  />
                  <Radio
                    id="googleAds-refuse"
                    value="refuse"
                    checked={googleAdsValue === 'refuse'}
                    label={
                      <Trans i18nKey="cookies.management.refuse">Refuser</Trans>
                    }
                    {...register('googleAds')}
                  />
                </div>
              </legend>
              <p className="mt-2 text-base text-gray-700">
                <Trans i18nKey="cookies.management.googleAds.description">
                  Nous utilisons des cookies pour calibrer et nos publicités en
                  ligne.
                </Trans>
              </p>
            </fieldset>
          </div>
          <div className="flex justify-start border-t border-gray-100 bg-white px-8 pt-4 pb-8">
            <Button type="submit" color="primary">
              <Trans i18nKey="cookies.management.confirm">
                Confirmer mes choix
              </Trans>
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
