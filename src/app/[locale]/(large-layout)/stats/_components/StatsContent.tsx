'use client'

import Trans from '@/components/translation/trans/TransClient'
import Title from '@/design-system/layout/Title'
import MetabaseIframe from './content/MetabaseIframe'

export default function StatsContent() {
  return (
    <div>
      <Title>
        <Trans>Statistiques</Trans>
      </Title>
      <div className="mt-8">
        <h2>
          <Trans>Visites et simulations</Trans>
        </h2>
        <MetabaseIframe
          id="stats-general"
          titre="stats-general"
          src="http://metabase.nosgestesclimat.fr/public/dashboard/b69428fd-f60f-478a-b3b1-0d0e98d64547#titled=false"
          height="800px"
        />{' '}
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Données qualitatives</Trans>
        </h2>
        <MetabaseIframe
          id="stats-quali"
          titre="stats-quali"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/1ca406e9-7366-4cc2-8930-50b8f9fde77d#titled=false"
          height="500px"
        />{' '}
      </div>
      <div className="mt-8">
        <h2>
          <Trans>Modes "Groupes"</Trans>
        </h2>
        <p>
          {' '}
          <Trans>
            Il est question ici des modes "Organisations" et "Challenge tes
            amis". Cette section est générée via Metabase.
          </Trans>{' '}
        </p>
        <h3>Mode "Organisations"</h3>
        <MetabaseIframe
          id="stats-orga"
          titre="stats mode orga"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/fd7c7f21-460a-44bb-865d-ceb72f3eafe2#titled=false"
          height="500px"
        />
        <h3 className="mt-4">Mode "Challenge tes amis"</h3>
        <MetabaseIframe
          id="stats-amis"
          titre="stats-amis"
          src="https://metabase.nosgestesclimat.fr/public/dashboard/73de06cd-a637-470b-a8a7-3ed86a06da4a#titled=false"
          height="500px"
        />{' '}
      </div>
    </div>
  )
}
