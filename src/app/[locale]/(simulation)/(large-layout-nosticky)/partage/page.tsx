'use client'

import MetricSlider from '@/components/fin/MetricSlider'
import TransClient from '@/components/translation/trans/TransClient'
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
          <TransClient>Découvre mes empreintes</TransClient>
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
            <TransClient>
              En 10 minutes, obtenez une estimation de vos empreintes carbone et
              eau.
            </TransClient>
          }>
          <TransClient>
            <span className="text-secondary-700">Et vous,</span> quel est votre
            impact sur notre planète ?
          </TransClient>
        </Title>

        <ButtonLink href={getLinkToSimulateurPage()}>
          <TransClient>{linkToSimulateurPageLabel}</TransClient>
        </ButtonLink>
      </div>
    </div>
  )
}
