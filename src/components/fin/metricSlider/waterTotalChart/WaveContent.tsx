import Wave from 'react-wavify'

export default function WaveContent() {
  return (
    <div className="relative hidden overflow-hidden px-4 pt-16 pb-6 transition-opacity md:block lg:pt-14 lg:pb-8">
      <Wave
        fill="#5152D0"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-full w-full"
        options={{
          height: 15,
          amplitude: 20,
          speed: 0.11,
          points: 3,
        }}
      />
    </div>
  )
}
