import Wave from 'react-wavify'
import InseeCodeInput from './waveContent/InseeCodeInput'
import Octopus from './waveContent/Octopus'

export default function WaveContent() {
  return (
    <div className="relative flex-1 overflow-hidden px-4 pb-6 pt-12 lg:p-12">
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
      <p className="relative text-xs italic text-white lg:text-base">
        L’eau directe sort de vos robinets. <br className="hidden lg:inline" />
        C’est celle que vous payez au travers de votre facture d’eau.
      </p>
      <p className="relative mb-0 text-xs italic text-white lg:text-base">
        Son impact n’est pas le même selon la saison et votre localisation.
        Entrez votre code postal pour saisir les enjeux de votre territoire.
      </p>
      <InseeCodeInput />
    </div>
  )
}
