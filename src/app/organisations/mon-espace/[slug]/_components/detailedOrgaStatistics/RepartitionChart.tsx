type Props = {
  items: {
    value: number
    shouldBeHighlighted?: boolean
  }[]
}

// Chaque simulation représente un point du graphique
// la position d'un point est déterminée par sa valeur
// 29 === 100% et 2 === 0%

export default function RepartitionChart({ items }: Props) {
  return (
    <div className="relative h-[48px] rounded-lg border border-gray-300 bg-white">
      {items.map(({ value, shouldBeHighlighted }, index) => (
        // Calculer la position du point "item" sur l'axe horizontal
        // avec 0% === 2 et 100% === 29
        <div
          key={`repartition-chart-item-${index}`}
          className={`absolute h-2 w-2 rounded-full bg-primary-500 opacity-10 ${
            shouldBeHighlighted ? 'bg-secondary opacity-100' : ''
          }`}
          style={{
            left: `${(value / 29) * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
