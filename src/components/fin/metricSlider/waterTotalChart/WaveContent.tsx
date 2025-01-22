import Wave from 'react-wavify'
import Octopus from './waveContent/Octopus'

export default function WaveContent() {
  return (
    <div className="relative hidden overflow-hidden px-4 pb-6 pt-16 transition-opacity md:block lg:pb-8 lg:pt-14">
      <Wave
        fill="#5152D0"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full"
        options={{
          height: 15,
          amplitude: 20,
          speed: 0.11,
          points: 3,
        }}
      />
      <Octopus />
    </div>
  )
}
