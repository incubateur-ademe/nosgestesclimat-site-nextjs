import SaveIcon from '@/components/icons/SaveIcon'
import Trans from '@/components/translation/Trans'
import {
  organisationsDashboardClickFunFacts,
  organisationsDashboardClickFunFactsDownload,
} from '@/constants/tracking/pages/organisationsDashboard'
import ChevronRight from '@/design-system/icons/ChevronRight'
import Button from '@/design-system/inputs/Button'
import { DottedName } from '@/publicodes-state/types'
import { trackEvent } from '@/utils/matomo/trackEvent'
import { FunFacts } from '@incubateur-ademe/nosgestesclimat'
import { toPng } from 'html-to-image'
import { useParams } from 'next/navigation'
import { utils } from 'publicodes'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FunFactsItem from './FunFactsItem'
import FunFactsPlusCategoryTitle from './FunFactsPlusCategoryTitle'

type Props = {
  plusFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName }
  funFacts: FunFacts
}

export default function FunFactsPlus({ plusFunFactsRules, funFacts }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const params = useParams()

  const funFactsByCategory: Record<DottedName, [string, DottedName][]> = {}

  Object.entries(plusFunFactsRules).forEach((item) => {
    const parent = utils.ruleParent(item[1]) as keyof typeof funFactsByCategory
    funFactsByCategory[parent] = [...(funFactsByCategory[parent] || []), item]
  })

  return (
    <div className="flex flex-col">
      <Button
        className="my-4 w-36 self-center !px-4 md:self-end"
        color="link"
        onClick={() => {
          trackEvent(organisationsDashboardClickFunFacts)
          setIsModalVisible(!isModalVisible)
        }}>
        <ChevronRight
          className={twMerge('mr-2 rotate-90', isModalVisible && '-rotate-90')}
        />
        <span className="w-24">
          {!isModalVisible ? (
            <Trans>Voir plus</Trans>
          ) : (
            <Trans>Voir moins</Trans>
          )}
        </span>
      </Button>
      {isModalVisible && (
        <div className="rounded-xl bg-gray-100">
          <div className="bg-gray-100 p-8 pb-16" id="funFactsPlus">
            <h2>Chiffres clés</h2>
            {Object.entries(funFactsByCategory).map(
              ([category, funFactsEntries]) => (
                <div key={category} className="mt-12">
                  <FunFactsPlusCategoryTitle category={category} />
                  <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {funFactsEntries.map(([funFactKey, dottedName]) => (
                      <FunFactsItem
                        key={funFactKey}
                        funFactKey={funFactKey}
                        dottedName={dottedName}
                        funFacts={funFacts}
                        small={true}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="mb-8 px-8">
            <Button
              size="sm"
              color="secondary"
              onClick={() => {
                trackEvent(organisationsDashboardClickFunFactsDownload)

                const funFactsPlus = document.getElementById(
                  'funFactsPlus'
                ) as HTMLElement

                toPng(funFactsPlus).then(function (dataUrl) {
                  const link = document.createElement('a')
                  link.download = `vos-chiffres-cles-${params.slug}.png`
                  link.href = dataUrl
                  link.click()
                  link.remove()
                })
              }}>
              <SaveIcon className="mr-2 w-4 fill-primary-700" />
              <Trans>Télécharger l'image</Trans>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
