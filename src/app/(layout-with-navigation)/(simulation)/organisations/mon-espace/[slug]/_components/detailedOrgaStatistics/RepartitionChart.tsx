type Props = {
  items: {
    value: number
    shouldBeHighlighted?: boolean
  }[]
}

export default function RepartitionChart({ items }: Props) {
  return (
    <div className="relative h-[48px] overflow-hidden rounded-lg border border-gray-300 bg-white px-2">
      {items.map(({ value, shouldBeHighlighted }, index) => (
        <div
          key={`repartition-chart-item-${index}`}
          className={`absolute h-8 w-2 bg-primary-500 opacity-20 ${
            shouldBeHighlighted
              ? '!z-10 border-x border-white !bg-secondary !opacity-100'
              : ''
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
