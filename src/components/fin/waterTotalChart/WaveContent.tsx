import Emoji from '@/design-system/utils/Emoji'
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
        Ce chiffre vous semble impressionnant ? Ce n'est pas un bug !
        L'empreinte eau comprend toute l'eau qui se cache dans vos usages et
        objets du quotidien. C'est le volume d'eau douce consommée pour produire
        un bien ou un service. <br className="hidden lg:inline" />
        On vous explique dans cette page ! <Emoji>👇</Emoji>
      </p>
    </div>
  )
}
