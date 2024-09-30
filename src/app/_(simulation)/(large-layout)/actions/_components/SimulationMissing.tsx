'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'
import { useCurrentSimulation } from '@/publicodes-state'

export default function SimulationMissing() {
  const { progression } = useCurrentSimulation()

  // TODO this is quite a bad design
  // we'd better check if the test is finished
  // but is it too restrictive ?
  const isSimulationWellStarted = progression > 0.5

  if (isSimulationWellStarted) {
    return null
  }

  return (
    <div className="mb-8">
      <Card className="border-none !bg-gray-100">
        <h2>
          <Trans>Calcul d'empreinte carbone manquant</Trans>
        </h2>
        <p>
          🔒{' '}
          <Trans i18nKey={'publicodes.SimulationMissing.simulationManquante'}>
            Pour débloquer ce parcours, vous devez d'abord terminer le test.
          </Trans>
        </p>

        <div>
          <ButtonLink href={getLinkToSimulateur()}>
            <Trans>
              {progression > 0 ? 'Reprendre mon test' : 'Faire le test'}
            </Trans>
          </ButtonLink>
        </div>

        <p className="mb-0 mt-4">
          <small>
            <Trans i18nKey={'publicodes.SimulationMissing.personnas'}>
              Vous pouvez aussi continuer avec un{' '}
              <Link href={'/personas'}>profil type</Link>.
            </Trans>
          </small>
        </p>
      </Card>
    </div>
  )
}
