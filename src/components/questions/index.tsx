import Avion from './Avion'
import Plats from './Plats'
import Voiture from './Voiture'

type Props = {
  setTempValue?: (value: number | undefined) => void
  tempValue?: number
}

const questions: Record<string, any> = {
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
}

export default questions
