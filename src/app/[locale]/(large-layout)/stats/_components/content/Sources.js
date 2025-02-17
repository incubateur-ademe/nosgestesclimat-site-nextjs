'use client'

import TransClient from '@/components/translation/trans/TransClient'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Table from './sources/Table'

export default function Sources(props) {
  const { t } = useClientTranslation()
  return (
    <section className="mt-8">
      <h3>
        <TransClient>Origine des visites</TransClient>
      </h3>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Table
            title={t('Sites Web')}
            data={props.currentMonthWebsitesData}
            total={props.currentMonthVisitsData}
            limit={5}
          />
        </div>

        <Table
          title={t('Réseaux Sociaux')}
          data={props.currentMonthSocialsData}
          total={props.currentMonthVisitsData}
          limit={5}
        />
      </div>
    </section>
  )
}
