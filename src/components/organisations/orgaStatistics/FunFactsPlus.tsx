import Trans from '@/components/translation/Trans'
import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { DottedName } from '@/publicodes-state/types'
import { FunFacts } from '@/types/organisations'
import { useState } from 'react'
import FunFactsItem from './FunFactsItem'

type Props = {
  plusFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName }
  funFacts: FunFacts
}

export default function FunFactsPlus({ plusFunFactsRules, funFacts }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <div className="">
      <Button
        className="ml-[90%]"
        color="link"
        onClick={() => setIsModalVisible(!isModalVisible)}>
        {!isModalVisible ? <Trans>Voir plus</Trans> : <Trans>Voir moins</Trans>}
      </Button>
      <Card className={isModalVisible ? 'visible' : 'hidden'}>
        <h3>D'autres fun facts ?</h3>
        {Object.entries(plusFunFactsRules).map(([funFactKey, dottedName]) => (
          <FunFactsItem
            key={funFactKey}
            funFactKey={funFactKey}
            dottedName={dottedName}
            funFacts={funFacts}
          />
        ))}
      </Card>
    </div>
  )
}
