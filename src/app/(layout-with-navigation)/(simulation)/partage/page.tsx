'use client'

import TotalChart from '@/components/fin/TotalChart'
import MainSubcategory from '@/components/fin/mainSubcategories/MainSubcategory'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Title from '@/design-system/layout/Title'
import { useSimulateurPage } from '@/hooks/navigation/useSimulateurPage'
import { useGetShareInfosParams } from '@/hooks/useGetShareInfosParams'

export default function PartagePage() {
  const { total, subcategories } = useGetShareInfosParams()

  const { getLinkToSimulateurPage, linkToSimulateurPageLabel } =
    useSimulateurPage()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="lg:mb-44">
        <Title className="text-lg md:text-2xl">
          <Trans>Découvre mon empreinte carbone</Trans>
        </Title>
      </div>
      <TotalChart total={total} />

      <div className="mb-8 flex flex-col items-start gap-4 lg:mb-14 lg:mt-10">
        <Title
          tag="h2"
          className="text-lg md:text-2xl"
          title={<Trans>Mes principaux postes d’émissions</Trans>}
        />
        {subcategories.map((subcategory, index) => (
          <MainSubcategory
            key={subcategory.dottedName}
            subcategory={subcategory.dottedName}
            value={subcategory.value}
            index={index}
          />
        ))}
      </div>

      <div className="rainbow-border items-start rounded-xl px-4 py-6 ">
        <Title
          tag="h2"
          className="text-lg lg:text-2xl"
          hasSeparator={false}
          subtitle={
            <Trans>
              En 10 minutes, obtenez une estimation de votre empreinte carbone.
            </Trans>
          }>
          <Trans>
            <span className="text-secondary-700">Et vous,</span> quel est votre
            impact sur le climat ?
          </Trans>
        </Title>

        <ButtonLink href={getLinkToSimulateurPage()}>
          <Trans>{linkToSimulateurPageLabel}</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
