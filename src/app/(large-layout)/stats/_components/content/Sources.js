import Trans from '@/components/translation/Trans'
import { useClientTranslation } from '@/hooks/useClientTranslation'
import Table from './sources/Table'

export default function Sources(props) {
  const { t } = useClientTranslation()
  return (
    <section className="mt-8">
      <h3>
        <Trans>Origine des visites</Trans>
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
