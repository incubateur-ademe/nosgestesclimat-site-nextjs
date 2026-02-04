'use client'

import Marianne from '@/components/images/partners/Marianne'
import Trans from '@/components/translation/trans/TransClient'
import { PARTNER_JAGIS } from '@/constants/partners'
import { trackEndClickJagisFirstBlock } from '@/constants/tracking/pages/end'
import Button from '@/design-system/buttons/Button'
import Loader from '@/design-system/layout/Loader'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation } from '@/publicodes-state'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function JagisMainBlock() {
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
    <div className="relative flex items-center justify-between rounded-xl border-2 border-amber-200 bg-amber-50 bg-[url('https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_coins_bg_mobile_2913b290f6.svg')] bg-contain bg-[center_right_4rem] bg-no-repeat px-4 py-6 lg:bg-[url('https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_coins_bg_desktop_12ce7b5fff.svg')] lg:bg-[center_right_7rem]">
      <div className="flex-1">
        <h3 className="mb-2 text-lg">
          <Trans>Un coup de pouce pour agir ?</Trans>
        </h3>
        <p className="text-sm lg:text-base">
          <Trans>
            Découvrez toutes les aides financières auxquelles vous avez droit
          </Trans>
        </p>
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
            <Trans>Une erreur est survenue</Trans>
          </div>
        )}
        {!couldOpen && isSuccess && (
          <div
            id="jagis-main-popup-error"
            className="text-red-600"
            role="alert"
            aria-live="polite">
            <Trans>
              Une erreur est survenue.{' '}
              <a href={data?.redirectUrl} rel="noreferrer" target="_blank">
                Cliquez sur ce lien pour naviguer vers J'agis.
              </a>
            </Trans>
          </div>
        )}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Marianne className="h-12 lg:h-auto" />
            <Image
              src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_df8fe4f4ff.svg"
              alt={t(`Logo de J'agis`)}
              width="60"
              height="60"
            />
          </div>

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
              trackEndClickJagisFirstBlock()
              exportSituation({
                situation,
                partner: PARTNER_JAGIS,
              })
            }}
            size="sm"
            className="flex h-11! max-h-11 items-center justify-center rounded-full leading-none">
            {isPending ? (
              <Loader />
            ) : (
              <span className="flex items-center gap-2">
                <span aria-hidden className="text-xl">
                  →
                </span>
                <Trans>Découvrir</Trans>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
