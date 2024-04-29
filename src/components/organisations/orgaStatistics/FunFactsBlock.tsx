import { FunFacts } from '@/types/organisations'
import { DottedName } from '@incubateur-ademe/nosgestesclimat'
import { twMerge } from 'tailwind-merge'
import FunFactsItem from './FunFactsItem'
import FunFactsModal from './FunFactsModal'

const defaultFunFactsRules: Record<string, DottedName> = {
  percentageOfBicycleUsers: 'ui . organisations . roule en vélo',
  percentageOfVegetarians: 'ui . organisations . est végétarien',
  percentageOfCarOwners: 'ui . organisations . roule en voiture',
}

const funFactsRules: { [k in keyof FunFacts]: DottedName } = {
  percentageOfBicycleUsers: 'ui . organisations . roule en vélo',
  percentageOfVegetarians: 'ui . organisations . est végétarien',
  percentageOfCarOwners: 'ui . organisations . roule en voiture',
  percentageOfPlaneUsers: "ui . organisations . prend l'avion",
  percentageOfLongPlaneUsers:
    "ui . organisations . prend l'avion long courrier",
}

export default function FunFactsBlock({
  funFacts,
  className,
}: {
  funFacts: FunFacts
  className?: string
}) {
  if (!funFacts) return null

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
      <FunFactsModal funFactsRules={funFactsRules} funFacts={funFacts} />
    </section>
  )
}
