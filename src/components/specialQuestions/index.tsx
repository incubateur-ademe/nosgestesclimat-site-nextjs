import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import type { JSX } from 'react'
import Ameublement from './Ameublement'
import Chauffage from './Chauffage'
import Plats from './Plats'
import Textile from './Textile'
import Voiture from './Voiture'

interface Props {
  setDisplayedValue?: (value: string | undefined) => void
  setTempValue?: (value: number | undefined) => void
  tempValue?: number
}

type SpecialQuestionProps = Props & { question: DottedName }

const PLAT_RULENAME: DottedName = 'alimentation . plats'
const VOITURE_RULENAME: DottedName = 'transport . voiture . km'
const TEXTILE_RULENAME: DottedName = 'divers . textile . volume'
const AMEUBLEMENT_RULENAME: DottedName = 'divers . ameublement . préservation'
const CHAUFFAGE_RULENAME: DottedName = 'logement . chauffage'

const specialQuestions: Record<
  string,
  (props: SpecialQuestionProps) => JSX.Element
> = {
  [PLAT_RULENAME]: (props: Props) => (
    <Plats key={PLAT_RULENAME} question={PLAT_RULENAME} {...props} />
  ),
  [VOITURE_RULENAME]: (props: Props) => (
    <Voiture key={VOITURE_RULENAME} question={VOITURE_RULENAME} {...props} />
  ),
  [TEXTILE_RULENAME]: (props: Props) => (
    <Textile key={TEXTILE_RULENAME} question={TEXTILE_RULENAME} {...props} />
  ),
  [AMEUBLEMENT_RULENAME]: (props: Props) => (
    <Ameublement
      key={AMEUBLEMENT_RULENAME}
      question={AMEUBLEMENT_RULENAME}
      {...props}
    />
  ),
  [CHAUFFAGE_RULENAME]: (props: Props) => (
    <Chauffage
      key={CHAUFFAGE_RULENAME}
      question={CHAUFFAGE_RULENAME}
      {...props}
    />
  ),
}

export default specialQuestions
