import Ameublement from './Ameublement'
import Avion from './Avion'
import Plats from './Plats'
import Textile from './Textile'
import Voiture from './Voiture'

type Props = {
  setDisplayedValue?: (value: string | undefined) => void
  setTempValue?: (value: number | undefined) => void
  tempValue?: number
}

const specialQuestions: Record<string, any> = {
  'alimentation . plats': (props: Props) => (
    <Plats key="alimentation . plats" {...props} />
  ),
  'transport . avion . court courrier . heures de vol': (props: Props) => (
    <Avion
      key="transport . avion . court courrier . heures de vol"
      question="transport . avion . court courrier . heures de vol"
      {...props}
    />
  ),
  'transport . avion . moyen courrier . heures de vol': (props: Props) => (
    <Avion
      key="transport . avion . moyen courrier . heures de vol"
      question="transport . avion . moyen courrier . heures de vol"
      {...props}
    />
  ),
  'transport . avion . long courrier . heures de vol': (props: Props) => (
    <Avion
      key="transport . avion . long courrier . heures de vol"
      question="transport . avion . long courrier . heures de vol"
      {...props}
    />
  ),
  'transport . voiture . km': (props: Props) => (
    <Voiture
      key="transport . voiture . km"
      question="transport . voiture . km"
      {...props}
    />
  ),
  'divers . textile . volume': (props: Props) => (
    <Textile
      key="divers . textile . volume"
      question="divers . textile . volume"
      {...props}
    />
  ),
  'divers . ameublement . préservation': (props: Props) => (
    <Ameublement
      key="divers . ameublement . préservation"
      question="divers . ameublement . préservation"
      {...props}
    />
  ),
}

export default specialQuestions
