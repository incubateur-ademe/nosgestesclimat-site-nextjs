type Props = { number: number }

export default function NumberDisplay({ number }: Props) {
  return (
    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap text-base text-black">
      <span className="text-3xl font-bold md:text-5xl">
        {(number / 1000).toLocaleString('fr-fr', {
          maximumFractionDigits: 1,
        })}
      </span>{' '}
      tonnes
    </div>
  )
}
