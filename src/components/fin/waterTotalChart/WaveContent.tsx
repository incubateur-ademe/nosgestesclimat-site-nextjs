import Wave from 'react-wavify'
import Octopus from './waveContent/Octopus'

export default function WaveContent() {
  return (
    <div className="relative overflow-hidden rounded-b-xl px-4 pb-4 pt-12 lg:px-24 lg:pb-8 lg:pt-14">
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
        Ce chiffre vous semble impressionnant ? <br />
        C'est pourtant bien l'eau qui sert à produire ce que vous consommez :
        <br className="hidden lg:inline" /> votre empreinte eau, c'est l'impact
        de votre mode de vie sur les cycles naturels de l'eau.
      </p>
    </div>
  )
}
