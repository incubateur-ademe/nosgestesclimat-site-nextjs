import Avion from './Avion'
import Plats from './Plats'
import Voiture from './Voiture'

const questions: Record<string, any> = {
  'alimentation . plats': <Plats key="alimentation . plats" />,
  'transport . avion . court courrier . heures de vol': (
    <Avion
      key="transport . avion . court courrier . heures de vol"
      question="transport . avion . court courrier . heures de vol"
    />
  ),
  'transport . avion . moyen courrier . heures de vol': (
    <Avion
      key="transport . avion . moyen courrier . heures de vol"
      question="transport . avion . moyen courrier . heures de vol"
    />
  ),
  'transport . avion . long courrier . heures de vol': (
    <Avion
      key="transport . avion . long courrier . heures de vol"
      question="transport . avion . long courrier . heures de vol"
    />
  ),
  'transport . voiture . km': (
    <Voiture
      key="transport . voiture . km"
      question="transport . voiture . km"
    />
  ),
}

export default questions
