import Button from '@/design-system/inputs/Button'
import Card from '@/design-system/layout/Card'
import { FunFacts } from '@/types/organisations'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { useState } from 'react'
import FunFactsItem from './FunFactsItem'

type Props = {
  funFactsRules: { [k in keyof FunFacts]: DottedName }
  funFacts: FunFacts
}

export default function FunFactsModal({ funFactsRules, funFacts }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <div className="mt-4">
      {!isModalVisible ? (
        <Button onClick={() => setIsModalVisible(true)}>+</Button>
      ) : (
        <Card className="">
          <h3>D'autres fun facts ?</h3>
          {Object.entries(funFactsRules).map(([funFactKey, dottedName]) => (
            <FunFactsItem
              key={funFactKey}
              funFactKey={funFactKey}
              dottedName={dottedName}
              funFacts={funFacts}
            />
          ))}
          <Button
            className="mt-4 max-w-32"
            onClick={() => setIsModalVisible(false)}>
            Fermer
          </Button>
        </Card>
      )}
    </div>
  )
}
