'use client'

import Link from '@/components/Link'
import NGCTrans from '@/components/translation/NGCTrans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { getLinkToSimulateur } from '@/helpers/navigation/simulateurPages'

type Props = {
  progression: number
}
export default function SimulationMissing({ progression }: Props) {
  return (
    <div className="mb-8">
      <Card className="border-none !bg-gray-100">
        <h2>
          <NGCTrans>Calcul d'empreinte carbone manquant</NGCTrans>
        </h2>
        <p>
          🔒{' '}
          <NGCTrans
            i18nKey={'publicodes.SimulationMissing.simulationManquante'}>
            Pour débloquer ce parcours, vous devez d'abord terminer le test.
          </NGCTrans>
        </p>

        <div>
          <ButtonLink href={getLinkToSimulateur()}>
            <NGCTrans>
              {progression > 0 ? 'Reprendre mon test' : 'Faire le test'}
            </NGCTrans>
          </ButtonLink>
        </div>

        <p className="mb-0 mt-4">
          <small>
            <NGCTrans i18nKey={'publicodes.SimulationMissing.personnas'}>
              Vous pouvez aussi continuer avec un{' '}
              <Link href={'/personas'}>profil type</Link>.
            </NGCTrans>
          </small>
        </p>
      </Card>
    </div>
  )
}
