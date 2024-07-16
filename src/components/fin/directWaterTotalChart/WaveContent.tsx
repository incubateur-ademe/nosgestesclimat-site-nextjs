import Button from '@/design-system/inputs/Button'
import { useCurrentMetric } from '@/hooks/useCurrentMetric'
import { useEffect, useState } from 'react'
import Wave from 'react-wavify'
import Octopus from './waveContent/Octopus'
import VigieEau from './waveContent/VigieEau'

export default function WaveContent() {
  const { currentMetric } = useCurrentMetric()

  const [isVigieEauOpen, setIsVigieEauOpen] = useState(false)

  useEffect(() => {
    setIsVigieEauOpen(false)
  }, [currentMetric])

  return (
    <div className="relative flex-1 overflow-hidden px-4 pb-4 pt-12 lg:p-12">
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
        <Button
          color="link"
          onClick={() =>
            setIsVigieEauOpen((prevIsVigieEauOpen) => !prevIsVigieEauOpen)
          }
          className="text-wrap border-none !p-0 text-left text-xs font-normal italic !leading-normal text-white hover:text-white lg:text-base">
          Découvrez les restrictions en ce moment en France.
        </Button>
      </p>
      {isVigieEauOpen && <VigieEau />}
    </div>
  )
}
