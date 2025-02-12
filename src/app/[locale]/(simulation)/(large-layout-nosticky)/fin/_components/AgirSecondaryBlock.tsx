import Logo from '@/components/misc/Logo'
import TransClient from '@/components/translation/trans/TransClient'
import { endClickJagisSecondBlock } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import Badge from '@/design-system/layout/Badge'
import Loader from '@/design-system/layout/Loader'
import { useExportSituationToAgir } from '@/hooks/simulation/useExportSituationToAgir'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function AgirSecondaryBlock() {
  const { t } = useClientTranslation()

  const [couldOpen, setCouldOpen] = useState(false)

  const { exportSimulation, data, isPending, isSuccess, isError, error } =
    useExportSituationToAgir()

  useEffect(() => {
    if (data?.redirectUrl && isSuccess) {
      const isOpen = window.open(data.redirectUrl, '_blank')
      setCouldOpen(isOpen ? true : false)
    }
  }, [data, isSuccess])

  return (
    <div className="rainbow-border relative rounded-xl border-2">
      <div className="bg-[url('/images/misc/jagis-bg.svg')] bg-right-bottom bg-no-repeat px-4 py-6 lg:bg-[length:18rem]">
        <div className="mb-4 flex gap-4">
          <Badge size="xs" color="green">
            <TransClient>Aides financières</TransClient>
          </Badge>
          <Badge size="xs" color="green">
            <TransClient>Bons plans</TransClient>
          </Badge>
          <Badge size="xs" color="green">
            <TransClient>Idées</TransClient>
          </Badge>
        </div>
        <h2 className="mb-2">
          <TransClient>Que faire pour réduire mon empreinte ?</TransClient>
        </h2>
        <p>
          <TransClient>
            À partir de votre bilan, <strong>J’agis</strong> vous propose des
            actions concrètes et adaptées à vos envies et à vos moyens
          </TransClient>
        </p>
        <Button
          disabled={isPending}
          className="mb-4"
          onClick={() => {
            trackEvent(endClickJagisSecondBlock)
            exportSimulation()
          }}>
          <TransClient>
            Créer mon compte {isPending && <Loader className="ml-2" />}
          </TransClient>
        </Button>
        {isError && <div className="text-red-600">{error?.toString()}</div>}
        {!data?.redirectUrl && isSuccess && (
          <div className="text-red-600">
            <TransClient>Une erreur est survenue</TransClient>
          </div>
        )}
        {!couldOpen && isSuccess && (
          <div className="text-red-600">
            <TransClient>
              Une erreur est survenue.{' '}
              <a href={data?.redirectUrl} rel="noreferrer" target="_blank">
                Cliquez sur ce lien pour naviguer vers J'agis.
              </a>
            </TransClient>
          </div>
        )}
        <div className="flex items-center gap-4">
          <Image
            src="/images/misc/jagis.svg"
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
