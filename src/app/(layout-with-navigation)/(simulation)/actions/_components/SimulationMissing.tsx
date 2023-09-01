'use client'

import Link from '@/components/Link'
import TransClient from '@/components/translation/TransClient'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import Card from '@/design-system/layout/Card'
import { Trans } from 'react-i18next'

export default function SimulationMissing() {
  return (
    <div>
      <Card>
        <p>
          🔒{' '}
          <TransClient
            i18nKey={'publicodes.SimulationMissing.simulationManquante'}>
            Pour débloquer ce parcours, vous devez d'abord terminer le test.
          </TransClient>
        </p>
        <div>
          <ButtonLink href="/simulateur/bilan">
            <Trans>Faire le test</Trans>
          </ButtonLink>
        </div>
        <p>
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
