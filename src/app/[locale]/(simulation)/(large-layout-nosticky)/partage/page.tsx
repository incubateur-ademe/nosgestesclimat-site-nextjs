'use client'

import MetricSlider from '@/components/fin/MetricSlider'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useGetShareInfosParams } from '@/hooks/useGetShareInfosParams'

export default function PartagePage() {
  const { carboneTotal, waterTotal } = useGetShareInfosParams()

  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <div className="relative">
      <div>
        <Title className="text-lg md:text-2xl">
          <Trans locale={locale}>Découvre mes empreintes</Trans>
        </Title>
      </div>
      <MetricSlider
        carboneTotal={carboneTotal}
        waterTotal={waterTotal}
        isStatic
      />
      <div className="rainbow-border mt-10 items-start rounded-xl px-4 py-6">
        <Title
          tag="h2"
          className="text-lg lg:text-2xl"
          hasSeparator={false}
          subtitle={
            <Trans locale={locale}>
              En 10 minutes, obtenez une estimation de vos empreintes carbone et
              eau.
            </Trans>
          }>
          <Trans locale={locale}>
            <span className="text-secondary-700">Et vous,</span> quel est votre
            impact sur notre planète ?
          </Trans>
        </Title>

        <ButtonLink href={getLinkToSimulateurPage()}>
          <Trans locale={locale}>{linkToSimulateurPageLabel}</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
