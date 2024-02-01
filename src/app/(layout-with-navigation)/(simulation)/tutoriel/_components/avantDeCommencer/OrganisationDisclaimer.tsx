'use client'

import Trans from '@/components/translation/Trans'
import { useUser } from '@/publicodes-state'

export default function OrganisationDisclaimer() {
  const { getCurrentSimulation } = useUser()

  const currentSimulation = getCurrentSimulation()

  // if (!currentSimulation.organisation) {
  //   return null
  // }
  console.log(currentSimulation)
  return (
    <div className="relative pl-8">
      <p className="overflow-visible before:absolute before:left-0 before:content-['🏢'] ">
        <Trans>
          Ce test vous est proposé par{' '}
          <span className="font-bold">{'SNCF'}</span>. Vos résultats seront
          partagés anonymement avec l’organisation
        </Trans>
      </p>
    </div>
  )
}
