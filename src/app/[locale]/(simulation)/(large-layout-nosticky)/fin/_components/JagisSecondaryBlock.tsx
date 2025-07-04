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
        <div className="mb-4 flex gap-4">
          <Badge size="xs" color="green">
            <Trans>Aides financières</Trans>
          </Badge>
          <Badge size="xs" color="green">
            <Trans>Bons plans</Trans>
          </Badge>
          <Badge size="xs" color="green">
            <Trans>Idées</Trans>
          </Badge>
        </div>
        <h2 className="mb-2">
          <Trans>Que faire pour réduire mon empreinte ?</Trans>
        </h2>
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
        {isError && <div className="text-red-600">{error?.toString()}</div>}
        {!data?.redirectUrl && isSuccess && (
          <div className="text-red-600">
            <Trans>Une erreur est survenue</Trans>
          </div>
        )}
        {!couldOpen && isSuccess && (
          <div className="text-red-600">
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
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/jagis_b73fae459d.svg"
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
