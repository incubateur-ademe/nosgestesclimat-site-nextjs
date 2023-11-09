import Icon from './circle/Icon'

type Props = {
  distance: number
}

const icons: number[] = []
for (let i = 0; i < 36; i++) {
  icons.push(i * 10)
}

export default function Circle({ distance }: Props) {
  const rotation = Math.random() * 30
  console.log('rotation', rotation)
  return (
    <div
      className="absolute"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}>
      {icons.map((angle, index) => (
        <Icon
          odd={index % 2 ? true : false}
          key={angle}
          angle={angle}
          rotation={rotation}
          distance={distance}
        />
      ))}
    </div>
  )
}
