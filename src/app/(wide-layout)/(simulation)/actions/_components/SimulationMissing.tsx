'use client'

import Link from '@/components/Link'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'

type Props = {
  progression: number
}
export default function SimulationMissing({ progression }: Props) {
  return (
    <div className="mb-8">
      <Card className="!bg-primary-100">
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
          <ButtonLink href="/simulateur/bilan">
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
