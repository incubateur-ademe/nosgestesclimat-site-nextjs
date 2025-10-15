import Logo from '@/components/misc/Logo'
import Trans from '@/components/translation/trans/TransClient'
import { PARTNER_JAGIS } from '@/constants/partners'
import { endClickJagisSecondBlock } from '@/constants/tracking/pages/end'
import Button from '@/design-system/buttons/Button'
import Badge from '@/design-system/layout/Badge'
import Loader from '@/design-system/layout/Loader'
import { useExportSituation } from '@/hooks/partners/useExportSituation'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { useCurrentSimulation } from '@/publicodes-state'
import { trackEvent } from '@/utils/analytics/trackEvent'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function JagisSecondaryBlock() {
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
    <div className="rainbow-border relative rounded-xl border-2">
      <div className="bg-[url('https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_bg_97afd09657.svg')] bg-right-bottom bg-no-repeat px-4 py-6 lg:bg-[length:18rem]">
        <div className="flex flex-col">
          <h2 className="order-1 mb-2">
            <Trans>Que faire pour réduire mon empreinte ?</Trans>
          </h2>
          <ul className="-order-1 mb-4 flex flex-wrap gap-4">
            <li>
              <Badge size="xs" color="green">
                <Trans>Aides financières</Trans>
              </Badge>
            </li>
            <li>
              <Badge size="xs" color="green">
                <Trans>Bons plans</Trans>
              </Badge>
            </li>
            <li>
              <Badge size="xs" color="green">
                <Trans>Idées</Trans>
              </Badge>
            </li>
          </ul>
        </div>

        <p>
          <Trans>À partir de votre bilan,</Trans> <strong>J’agis</strong>{' '}
          <Trans>
            vous propose des actions concrètes et adaptées à vos envies et à vos
            moyens
          </Trans>
        </p>
        <Button
          disabled={isPending}
          className="mb-4"
          aria-describedby={
            isError
              ? 'jagis-secondary-error'
              : !data?.redirectUrl && isSuccess
                ? 'jagis-secondary-redirect-error'
                : !couldOpen && isSuccess
                  ? 'jagis-secondary-popup-error'
                  : undefined
          }
          onClick={() => {
            trackEvent(endClickJagisSecondBlock)
            exportSituation({
              situation,
              partner: PARTNER_JAGIS,
            })
          }}>
          <Trans>
            Créer mon compte {isPending && <Loader className="ml-2" />}
          </Trans>
        </Button>
        {isError && (
          <div
            id="jagis-secondary-error"
            className="text-red-600"
            role="alert"
            aria-live="assertive">
            {error?.toString()}
          </div>
        )}
        {!data?.redirectUrl && isSuccess && (
          <div
            id="jagis-secondary-redirect-error"
            className="text-red-600"
            role="alert"
            aria-live="assertive">
            <Trans>Une erreur est survenue</Trans>
          </div>
        )}
        {!couldOpen && isSuccess && (
          <div
            id="jagis-secondary-popup-error"
            className="text-red-600"
            role="alert"
            aria-live="assertive">
            <Trans>
              Une erreur est survenue.{' '}
              <a href={data?.redirectUrl} rel="noreferrer" target="_blank">
                Cliquez sur ce lien pour naviguer vers J'agis.
              </a>
            </Trans>
          </div>
        )}
        <div className="flex items-center gap-4">
          <Image
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_df8fe4f4ff.svg"
            alt={t(`Logo de J'agis`)}
            width="60"
            height="60"
          />
          <Logo size="sm" />
        </div>
      </div>
    </div>
  )
}
