import { DottedName } from '@/publicodes-state/types'
import { FunFacts } from '@/types/organisations'
import { twMerge } from 'tailwind-merge'
import FunFactsItem from './FunFactsItem'
import FunFactsPlus from './FunFactsPlus'

const funFactsRules: { [k in keyof FunFacts]: DottedName } = {
  percentageOfBicycleUsers: 'ui . organisations . transport . roule en vélo',
  percentageOfVegetarians: 'ui . organisations . alimentation . est végétarien',
  percentageOfCarOwners: 'ui . organisations . transport . roule en voiture',
  percentageOfPlaneUsers: "ui . organisations . transport . prend l'avion",
  percentageOfLongPlaneUsers:
    "ui . organisations . transport . prend l'avion long courrier",
  averageOfCarKilometers: 'ui . organisations . transport . km en voiture',
  averageOfTravelers: 'ui . organisations . transport . voyageurs en voiture',
  percentageOfElectricHeating:
    'ui . organisations . logement . chauffage électricité',
  percentageOfGasHeating: 'ui . organisations . logement . chauffage gaz',
  percentageOfFuelHeating: 'ui . organisations . logement . chauffage fioul',
  percentageOfWoodHeating: 'ui . organisations . logement . chauffage bois',
  averageOfElectricityConsumption:
    'ui . organisations . logement . consommation électricité',
  percentageOfCoolingSystem:
    'ui . organisations . logement . possède climatisation',
  percentageOfVegan: 'ui . organisations . alimentation . est végétalien',
  percentageOfRedMeat:
    'ui . organisations . alimentation . fréquence viande rouge',
  percentageOfLocalAndSeasonal:
    'ui . organisations . alimentation . local et de saison',
  percentageOfBottledWater:
    'ui . organisations . alimentation . eau en bouteille',
  percentageOfZeroWaste: 'ui . organisations . alimentation . zéro déchet',
  amountOfClothing: 'ui . organisations . divers . textile',
  percentageOfStreaming: 'ui . organisations . divers . internet',
}

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
