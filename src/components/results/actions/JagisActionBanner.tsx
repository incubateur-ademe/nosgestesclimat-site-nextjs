'use client'
import Marianne from '@/components/images/partners/Marianne'
import Trans from '@/components/translation/trans/TransClient'
import { PARTNER_JAGIS } from '@/constants/partners'
import Button from '@/design-system/buttons/Button'
import Loader from '@/design-system/layout/Loader'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation } from '@/publicodes-state'
import { useEffect, useState } from 'react'

export default function JagisActionBanner() {
  const { t } = useClientTranslation()

  const [couldOpen, setCouldOpen] = useState(false)

  const { situation } = useCurrentSimulation()

  const { exportSituation, data, isPending, isSuccess, isError, error } =
    useExportSituation()

  useEffect(() => {
    if (data?.redirectUrl && isSuccess) {
      const isOpen = window.open(data.redirectUrl, '_blank')
      setCouldOpen(isOpen ? true : false)
    }
  }, [data, isSuccess])

  return (
    <div className="mt-10 rounded-xl border-2 border-yellow-300 bg-yellow-50 p-4 md:p-6">
      <div className="flex w-full items-start gap-6">
        <div className="flex-1">
          <h2 className="text-lg font-bold">
            <Trans i18nKey="mon-espace.actions.jagis.title">
              Que faire pour réduire mon empreinte ?{' '}
            </Trans>
          </h2>

          <p>
            <Trans i18nKey="mon-espace.actions.jagis.description.part1">
              À partir de votre bilan,
            </Trans>{' '}
            <Trans i18nKey="mon-espace.actions.jagis.description.part2">
              <strong>J’agis</strong>
            </Trans>{' '}
            <Trans i18nKey="mon-espace.actions.jagis.description.part3">
              vous propose des
            </Trans>{' '}
            <strong>
              <Trans i18nKey="mon-espace.actions.jagis.description.part4">
                actions concrètes
              </Trans>
            </strong>{' '}
            <Trans i18nKey="mon-espace.actions.jagis.description.part5">
              et
            </Trans>{' '}
            <strong>
              <Trans i18nKey="mon-espace.actions.jagis.description.part6">
                adaptées
              </Trans>
            </strong>{' '}
            <Trans i18nKey="mon-espace.actions.jagis.description.part7">
              à vos envies et vos moyens pour réduire votre empreinte.
            </Trans>
            <Trans i18nKey="mon-espace.actions.jagis.description.part8">
              à vos envies et vos moyens pour réduire votre empreinte.
            </Trans>
          </p>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Marianne className="h-12 min-w-16 lg:h-auto" />
          <img
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_df8fe4f4ff.svg"
            alt={t('common.partners.jagis.ariaLabel', "J'agis")}
            width="60"
            height="60"
          />
        </div>
      </div>

      {isError && (
        <div
          id="jagis-main-error"
          className="text-red-600"
          role="alert"
          aria-live="polite">
          {error?.toString()}
        </div>
      )}

      {!data?.redirectUrl && isSuccess && (
        <div
          id="jagis-main-redirect-error"
          className="text-red-600"
          role="alert"
          aria-live="polite">
          <Trans i18nKey="mon-espace.actions.jagis.error.redirect">
            Une erreur est survenue
          </Trans>
        </div>
      )}

      {!couldOpen && isSuccess && (
        <div
          id="jagis-main-popup-error"
          className="text-red-600"
          role="alert"
          aria-live="polite">
          <Trans i18nKey="mon-espace.actions.jagis.error.redirect.message">
            Une erreur est survenue.
          </Trans>{' '}
          <a href={data?.redirectUrl} rel="noreferrer" target="_blank">
            <Trans i18nKey="mon-espace.actions.jagis.error.redirect.link">
              Cliquez sur ce lien pour naviguer vers J'agis.
            </Trans>
          </a>
        </div>
      )}

      <Button
        disabled={isPending}
        aria-describedby={
          isError
            ? 'jagis-main-error'
            : !data?.redirectUrl && isSuccess
              ? 'jagis-main-redirect-error'
              : !couldOpen && isSuccess
                ? 'jagis-main-popup-error'
                : undefined
        }
        onClick={() => {
          exportSituation({
            situation,
            partner: PARTNER_JAGIS,
          })
        }}
        size="sm"
        className="flex h-11! max-h-11 min-w-[242px] items-center justify-center rounded-full leading-none">
        {isPending ? (
          <Loader />
        ) : (
          <span className="flex items-center gap-2">
            <span aria-hidden className="text-xl">
              →
            </span>
            <Trans i18nKey="mon-espace.actions.jagis.button">
              Aller plus loin avec J’agis
            </Trans>
          </span>
        )}
      </Button>

      <div className="mt-6 flex items-center gap-4 md:hidden">
        <Marianne className="h-12 lg:h-auto" />
        <img
          src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_df8fe4f4ff.svg"
          alt={t(`Logo de J'agis`)}
          width="60"
          height="60"
        />
      </div>
    </div>
  )
}
