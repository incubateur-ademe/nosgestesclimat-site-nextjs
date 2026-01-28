'use client'

import Trans from '@/components/translation/trans/TransClient'
import Button from '@/design-system/buttons/Button'
import InlineLink from '@/design-system/inputs/InlineLink'
import Modal from '@/design-system/modals/Modal'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { type CookieConsentChoices, CookieConsentKey } from '@/types/cookies'
import Link from 'next/link'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface CookieFormData {
  [CookieConsentKey.googleAds]: 'accept' | 'refuse'
}

interface RadioProps {
  id: string
  name: string
  checked: boolean
  disabled?: boolean
  label: string | React.ReactNode
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = ({
  id,
  name,
  checked,
  disabled,
  label,
  ...props
}: RadioProps) => (
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
  choices,
}: {
  isBoardOpen: boolean
  closeSettings: () => void
  refuseAll: () => void
  acceptAll: () => void
  confirmChoices: (data: CookieConsentChoices) => void
  choices?: CookieConsentChoices
}) {
  const { t } = useClientTranslation()

  const { register, handleSubmit, watch, setValue } = useForm<CookieFormData>({
    defaultValues: {
      [CookieConsentKey.googleAds]:
        choices?.[CookieConsentKey.googleAds] === false ? 'refuse' : 'accept',
    },
  })

  // @TODO: Remove this eslint-disable-next-line once we have a proper solution for this rule
  // eslint-disable-next-line react-hooks/incompatible-library
  const googleAdsValue = watch('googleAds')

  const onSubmit = (data: CookieFormData) => {
    const choices: CookieConsentChoices = {
      [CookieConsentKey.googleAds]:
        data[CookieConsentKey.googleAds] === 'accept',
    }
    confirmChoices(choices)
  }

  useEffect(() => {
    if (choices?.[CookieConsentKey.googleAds] !== undefined) {
      setValue(
        CookieConsentKey.googleAds,
        choices[CookieConsentKey.googleAds] ? 'accept' : 'refuse'
      )
    }
  }, [choices, setValue])

  return (
    <Modal
      isOpen={isBoardOpen}
      ariaLabel={t(
        'cookieConsent.banner.title',
        'Fenêtre modale de gestion des cookies'
      )}
      closeModal={closeSettings}
      hasAbortCross={true}
      hasAbortButton={false}
      className="!w-3xl max-w-screen overflow-hidden !rounded-2xl !p-0 !shadow-2xl">
      <div className="mx-auto flex w-full max-w-3xl flex-col rounded-2xl bg-white p-0 shadow-2xl">
        <div className="flex items-center justify-between px-8 pt-8 pb-2">
          <h2
            className="text-xl font-bold text-gray-900"
            data-testid="cookie-management-title">
            <Trans i18nKey="cookies.management.title">
              Panneau de gestion des cookies
            </Trans>
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} data-testid="cookie-form">
          <div className="max-h-[50vh] flex-1 overflow-y-auto px-8 pb-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <div>
                <span
                  className="text-base font-medium text-gray-900"
                  data-testid="preferences-text">
                  <Trans i18nKey="cookies.management.preferences">
                    Préférences pour tous les services.{' '}
                  </Trans>
                </span>
                <InlineLink
                  href="/politique-de-confidentialite#cookies"
                  data-testid="privacy-link">
                  <Trans i18nKey="cookies.management.privacyLink">
                    Données personnelles et cookies
                  </Trans>
                </InlineLink>
              </div>
              <ul className="mb-8 flex flex-wrap gap-3 md:flex-nowrap">
                <li>
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => {
                      setValue(CookieConsentKey.googleAds, 'refuse')
                      refuseAll()
                    }}
                    size="sm"
                    data-testid="refuse-all-button">
                    <Trans i18nKey="cookies.management.refuseAll">
                      Tout refuser
                    </Trans>
                  </Button>
                </li>
                <li>
                  <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                      setValue(CookieConsentKey.googleAds, 'accept')
                      acceptAll()
                    }}
                    size="sm"
                    data-testid="accept-all-button">
                    <Trans i18nKey="cookies.management.acceptAll">
                      Tout accepter
                    </Trans>
                  </Button>
                </li>
              </ul>
            </div>

            <fieldset className="mb-6 border-t border-gray-200">
              <legend className="mb-2 flex w-full flex-col flex-wrap justify-between gap-2 sm:flex-row sm:items-center">
                <span
                  className="text-base font-bold whitespace-nowrap text-gray-900 md:text-lg"
                  data-testid="required-cookies-title">
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
                    data-testid="required-accept-radio"
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
                    data-testid="required-refuse-radio"
                    label={
                      <Trans i18nKey="cookies.management.refuse">Refuser</Trans>
                    }
                  />
                </div>
              </legend>
              <p
                className="mt-2 text-base text-gray-700"
                data-testid="required-cookies-description">
                <Trans i18nKey="cookies.management.required.description">
                  Notre site utilise des cookies indispensables à son bon
                  fonctionnement (sécurité, choix de langue, authentification).
                  Ils ne contiennent aucune donnée personnelle et ne peuvent pas
                  être désactivés.
                </Trans>
              </p>
            </fieldset>

            <fieldset className="border-t border-gray-200">
              <legend className="mb-2 flex w-full flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <span
                  className="text-base font-bold whitespace-nowrap text-gray-900 md:text-lg"
                  data-testid="google-ads-title">
                  <Trans i18nKey="cookies.management.googleAds.title">
                    Google Ads
                  </Trans>
                </span>
                <div className="flex gap-6">
                  <Radio
                    id="googleAds-accept"
                    value="accept"
                    checked={googleAdsValue === 'accept'}
                    data-testid="google-ads-accept-radio"
                    label={
                      <Trans i18nKey="cookies.management.accept">
                        Accepter
                      </Trans>
                    }
                    {...register(CookieConsentKey.googleAds)}
                  />
                  <Radio
                    id="googleAds-refuse"
                    value="refuse"
                    checked={googleAdsValue === 'refuse'}
                    data-testid="google-ads-refuse-radio"
                    label={
                      <Trans i18nKey="cookies.management.refuse">Refuser</Trans>
                    }
                    {...register(CookieConsentKey.googleAds)}
                  />
                </div>
              </legend>
              <p
                className="mt-2 text-base text-gray-700"
                data-testid="google-ads-description">
                <Trans i18nKey="cookies.management.googleAds.description">
                  Nous utilisons des cookies pour mesurer et calibrer
                  l'efficacité de nos campagnes et publicités en ligne.
                </Trans>
              </p>
            </fieldset>
          </div>
          <div className="flex justify-start border-t border-gray-100 bg-white px-8 pt-4 pb-8">
            <Button
              type="submit"
              color="primary"
              data-testid="confirm-choices-button">
              <Trans i18nKey="cookies.management.confirm">
                Confirmer mes choix
              </Trans>
            </Button>
          </div>
        </form>

        <div className="px-8 pt-4 pb-8">
          <h2 className="text-lg font-bold">
            <Trans i18nKey="cookies.management.audience.title">
              Mesure d’audience
            </Trans>
          </h2>
          <p>
            <Trans i18nKey="cookies.management.audience.description">
              Pour désactiver tous les cookies de mesure d’audience anonymes,
              cliquez
            </Trans>{' '}
            <Link
              href="/politique-de-confidentialite#cookies"
              title={t(
                'cookies.management.audience.linkTitle',
                'Visiter notre politique de confidentialité'
              )}
              className="text-primary-700 underline">
              <Trans i18nKey="cookies.management.audience.linkText">ici</Trans>
            </Link>
            .
          </p>
        </div>
      </div>
    </Modal>
  )
}
