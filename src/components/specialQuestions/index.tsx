import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Ameublement from './Ameublement'
import Avion from './Avion'
import Chauffage from './Chauffage'
import Plats from './Plats'
import Textile from './Textile'
import Voiture from './Voiture'

type Props = {
  setDisplayedValue?: (value: string | undefined) => void
  setTempValue?: (value: number | undefined) => void
  tempValue?: number
}

const PLAT_RULENAME: DottedName = 'alimentation . plats'
const AVION_COURT_RULENAME: DottedName =
  'transport . avion . court courrier . heures de vol'
const AVION_MOYEN_RULENAME: DottedName =
  'transport . avion . moyen courrier . heures de vol'
const AVION_LONG_RULENAME: DottedName =
  'transport . avion . long courrier . heures de vol'
const VOITURE_RULENAME: DottedName = 'transport . voiture . km'
const TEXTILE_RULENAME: DottedName = 'divers . textile . volume'
const AMEUBLEMENT_RULENAME: DottedName = 'divers . ameublement . préservation'
const CHAUFFAGE_RULENAME: DottedName = 'logement . chauffage'

const specialQuestions: Record<string, any> = {
  [PLAT_RULENAME]: (props: Props) => (
    <Plats key={PLAT_RULENAME} question={PLAT_RULENAME} {...props} />
  ),
  [AVION_COURT_RULENAME]: (props: Props) => (
    <Avion
      key={AVION_COURT_RULENAME}
      question={AVION_COURT_RULENAME}
      {...props}
    />
  ),
  [AVION_MOYEN_RULENAME]: (props: Props) => (
    <Avion
      key={AVION_MOYEN_RULENAME}
      question={AVION_MOYEN_RULENAME}
      {...props}
    />
  ),
  [AVION_LONG_RULENAME]: (props: Props) => (
    <Avion
      key={AVION_LONG_RULENAME}
      question={AVION_LONG_RULENAME}
      {...props}
    />
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
