import { DottedName } from '@/publicodes-state/types'
import { FunFacts } from '@/types/organisations'
import { twMerge } from 'tailwind-merge'
import FunFactsItem from './FunFactsItem'
import FunFactsPlus from './FunFactsPlus'

const funFactsRules: { [k in keyof FunFacts]: DottedName } = {
  percentageOfBicycleUsers: 'ui . organisations . roule en vélo',
  percentageOfVegetarians: 'ui . organisations . est végétarien',
  percentageOfCarOwners: 'ui . organisations . roule en voiture',
  percentageOfPlaneUsers: "ui . organisations . prend l'avion",
  percentageOfLongPlaneUsers:
    "ui . organisations . prend l'avion long courrier",
  averageOfCarKilometers: 'ui . organisations . km',
  averageOfTravelers: 'ui . organisations . voyageurs',
  percentageOfElectricHeating: 'ui . organisations . chauffage électricité',
  percentageOfGasHeating: 'ui . organisations . chauffage gaz',
  percentageOfFuelHeating: 'ui . organisations . chauffage fioul',
  percentageOfWoodHeating: 'ui . organisations . chauffage bois',
  averageOfElectricityConsumption:
    'ui . organisations . consommation électricité',
  percentageOfCoolingSystem: 'ui . organisations . possède climatisation',
  percentageOfVegan: 'ui . organisations . est végétalien',
  percentageOfRedMeat: 'ui . organisations . fréquence viande rouge',
  percentageOfLocalAndSeasonal: 'ui . organisations . local et de saison',
  percentageOfBottledWater: 'ui . organisations . eau en bouteille',
  percentageOfZeroWaste: 'ui . organisations . zéro déchet',
  amountOfClothing: 'ui . organisations . textile',
  percentageOfStreaming: 'ui . organisations . internet',
}

const defaultFunFactsRules: { [k in keyof Partial<FunFacts>]: DottedName } = {
  percentageOfBicycleUsers: 'ui . organisations . roule en vélo',
  percentageOfVegetarians: 'ui . organisations . est végétarien',
  percentageOfCarOwners: 'ui . organisations . roule en voiture',
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
      <FunFactsPlus plusFunFactsRules={plusFunFactsRules} funFacts={funFacts} />
    </section>
  )
}
