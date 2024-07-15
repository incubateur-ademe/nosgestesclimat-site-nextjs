import Emoji from '@/design-system/utils/Emoji'

export default function DirectWaterWarning() {
  return (
    <p className="mb-0 text-xs italic">
      <Emoji>⚠️</Emoji> À ce stade, notre simulateur ne permet pas de rentrer
      dans le détail de votre empreinte eau indirecte. Mais il est tout de même
      possible d’en saisir les grandes mailles au travers des questions
      alimentation et consommation.
    </p>
  )
}
