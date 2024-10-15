import Marianne from '@/components/images/partners/Marianne'
import Trans from '@/components/translation/Trans'
import { endClickJagisFirstBlock } from '@/constants/tracking/pages/end'
import Button from '@/design-system/inputs/Button'
import { useExportSituationToAgir } from '@/hooks/simulation/useExportSituationToAgir'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import { trackEvent } from '@/utils/matomo/trackEvent'
import Image from 'next/image'
import { useEffect } from 'react'

export default function AgirMainBlock() {
  const { t } = useClientTranslation()

  const { exportSimulation, data, isPending, isSuccess, isError, error } =
    useExportSituationToAgir()

  useEffect(() => {
    if (data?.redirectUrl && isSuccess) {
      window.open(data.redirectUrl, '_blank')
      return
    }
  }, [data, isSuccess])

  return (
    <div className="relative flex items-center justify-between rounded-xl border-2 border-amber-200 bg-amber-50 bg-[url('/images/misc/jagis-coins-bg-mobile.svg')] bg-contain bg-[center_right_4rem] bg-no-repeat px-4 py-6 lg:bg-[url('/images/misc/jagis-coins-bg-desktop.svg')] lg:bg-[center_right_7rem]">
      <div className="flex-1">
        <h3 className="mb-2 text-lg">
          <Trans>Un coup de pouce pour agir ?</Trans>
        </h3>
        <p className="text-sm lg:text-base">
          <Trans>
            Découvrez toutes les aides financières auxquelles vous avez droit
          </Trans>
        </p>
        {isError && <div className="text-red-600">{error?.toString()}</div>}
        {!data?.redirectUrl && isSuccess && (
          <div className="text-red-600">
            <Trans>Une erreur est survenue</Trans>
          </div>
        )}
        <div className="flex items-center gap-4">
          <Marianne className="h-12 lg:h-auto" />
          <Image
            src="/images/misc/jagis.svg"
            alt={t(`Logo de J'agis`)}
            width="60"
            height="60"
          />
        </div>
      </div>
      <Button
        disabled={isPending}
        onClick={() => {
          trackEvent(endClickJagisFirstBlock)
          exportSimulation()
        }}
        className="flex !h-11 max-h-11 !w-11 max-w-11 items-center justify-center rounded-full !p-0 !text-2xl leading-none">
        →
      </Button>
    </div>
  )
}
