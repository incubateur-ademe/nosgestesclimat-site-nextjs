import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { DottedName } from '@/publicodes-state/types'
import { FunFacts } from '@/types/organisations'
import { utils } from 'publicodes'
import { useState } from 'react'
import FunFactsItem from './FunFactsItem'
import FunFactsPlusCategoryTitle from './FunFactsPlusCategoryTitle'

type Props = {
  plusFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName }
  funFacts: FunFacts
}

export default function FunFactsPlus({ plusFunFactsRules, funFacts }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const funFactsByCategory: Record<DottedName, [string, DottedName][]> = {}

  Object.entries(plusFunFactsRules).forEach((item) => {
    const parent = utils.ruleParent(item[1]) as keyof typeof funFactsByCategory
    funFactsByCategory[parent] = [...(funFactsByCategory[parent] || []), item]
  })

  return (
    <div>
      <Button
        className="ml-[90%]"
        color="link"
        onClick={() => setIsModalVisible(!isModalVisible)}>
        {!isModalVisible ? <Trans>Voir plus</Trans> : <Trans>Voir moins</Trans>}
      </Button>
      <Card className={isModalVisible ? 'visible' : 'hidden'}>
        {Object.entries(funFactsByCategory).map(
          ([category, funFactsEntries]) => (
            <div key={category}>
              <FunFactsPlusCategoryTitle category={category} />
              <div className="grid grid-cols-3 gap-1">
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
      </Card>
    </div>
  )
}
