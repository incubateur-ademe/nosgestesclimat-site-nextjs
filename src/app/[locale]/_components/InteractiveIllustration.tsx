'use client'

import Trans from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Image from 'next/image'
import { FloatingElementDisplayedProvider } from './interactiveIllustration/FloatingElementDisplayedProvider'
import PulsatingDot from './interactiveIllustration/PulsatingDot'
export default function InteractiveIllustration() {
  const { t } = useClientTranslation()

  return (
    <div className="relative mx-auto sm:max-w-[380px] md:max-w-none">
      <Image
        src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/empreinte_carbone_eau_objets_du_quotidien_8717e67e8e.svg"
        alt={t(
          "Une fille tapant sur son ordinateur, entouré d'objets aux empreintes carbone et eau variées."
        )}
        width={580}
        height={580}
      />
      <FloatingElementDisplayedProvider>
        {/* Computer */}
        <PulsatingDot
          className="bottom-[15%] left-[50%]"
          itemTitle={<Trans>Ordinateur</Trans>}
          itemKey="computer"
          carbonScore={4}
          waterScore={4}
          shouldDefaultDisplayFloatingInfo={true}
        />

        {/* Shirt */}
        <PulsatingDot
          className="top-[40%] right-[35%]"
          itemTitle={<Trans>Chemisier</Trans>}
          itemKey="shirt"
          carbonScore={3}
          waterScore={5}
          floatingInfoOrientation="left"
        />

        {/* Coffee */}
        <PulsatingDot
          className="bottom-[41%] left-[12%]"
          itemTitle={<Trans>Café</Trans>}
          itemKey="coffee"
          carbonScore={4}
          waterScore={3}
        />

        {/* Car */}
        <PulsatingDot
          className="bottom-[15%] left-[10%]"
          itemTitle={<Trans>Voiture</Trans>}
          carbonScore={5}
          itemKey="car"
        />
      </FloatingElementDisplayedProvider>
    </div>
  )
}
