import Circle from './icons/Circle'

const distanceBetweenIcons = 5
const numberOfCircles = 7
const circles: number[] = []
for (let i = 0; i < numberOfCircles; i++) {
  circles.push(i * distanceBetweenIcons)
}

export default function Icons() {
  return (
    <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2">
      {circles.map((distance) => (
        <Circle key={distance} distance={distance} />
      ))}
    </div>
  )
}
