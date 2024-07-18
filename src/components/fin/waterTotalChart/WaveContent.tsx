import Wave from 'react-wavify'
import Octopus from './waveContent/Octopus'

export default function WaveContent() {
  return (
    <div className="relative overflow-hidden rounded-b-xl px-4 pb-4 pt-12 lg:px-56 lg:pb-8 lg:pt-14">
      <Wave
        fill="#5152D0"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-full w-full"
        options={{
          height: 10,
          amplitude: 20,
          speed: 0.11,
          points: 3,
        }}
      />
      <Octopus />
      <p className="relative mb-0 text-xs italic text-white lg:text-base">
        L'empreinte eau comprend votre consommation domestique ainsi que l'eau
        qui se cache dans vos usages et objets du quotidien.
      </p>
    </div>
  )
}
