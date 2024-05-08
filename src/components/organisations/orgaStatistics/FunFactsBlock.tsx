import { DottedName } from '@/publicodes-state/types'
import { FunFacts } from '@incubateur-ademe/nosgestesclimat'
import importedFunFacts from '@incubateur-ademe/nosgestesclimat/public/funFactsRules.json'
import { twMerge } from 'tailwind-merge'
import FunFactsItem from './funFacts/FunFactsItem'
import FunFactsPlus from './funFacts/FunFactsPlus'

const funFactsRules = importedFunFacts as { [k in keyof FunFacts]: DottedName }

const defaultFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName } = {
  percentageOfBicycleUsers: 'ui . organisations . transport . roule en vélo',
  percentageOfVegetarians: 'ui . organisations . alimentation . est végétarien',
  percentageOfCarOwners: 'ui . organisations . transport . roule en voiture',
}

const plusFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName } =
  Object.fromEntries(
    Object.entries(funFactsRules).filter(
      ([key]) => !(key in defaultFunFactsRules)
    )
  )

export default function FunFactsBlock({
  funFacts,
  className,
}: {
  funFacts: FunFacts | undefined
  className?: string
}) {
  if (!funFacts) return null

  const isPlusAvailable = Object.keys(plusFunFactsRules)
    .map((key) => {
      if (key in funFacts) {
        return true
      }
      return false
    })
    .every((value) => value === true)

  return (
    <section className={twMerge('flex flex-col justify-center', className)}>
      <div className="flex flex-row flex-wrap justify-center gap-8 md:gap-16">
        {Object.entries(defaultFunFactsRules).map(
          ([funFactKey, dottedName]) => (
            <FunFactsItem
              key={funFactKey}
              funFactKey={funFactKey}
              dottedName={dottedName}
              funFacts={funFacts}
            />
          )
        )}
      </div>
      {isPlusAvailable && (
        <FunFactsPlus plusFunFactsRules={funFactsRules} funFacts={funFacts} />
      )}
    </section>
  )
}
