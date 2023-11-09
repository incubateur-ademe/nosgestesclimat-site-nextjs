type Props = {
  angle: number
  rotation: number
  distance: number
  odd: boolean
}

export default function Icon({ angle, rotation, distance, odd }: Props) {
  return (
    <div
      className={`absolute w-full origin-left ${odd ? 'hidden' : ''} md:block`}
      style={{
        transform: `rotate(${angle}deg)`,
      }}>
      <div
        className="absolute origin-center"
        style={{
          left: `calc(10rem + 20vw + ${distance}rem)`,
          transform: `rotate(${
            -(angle + rotation) + (Math.random() - 0.5) * 60
          }deg)`,
        }}>
        ICON
      </div>
    </div>
  )
}
