import CategoriesAccordion from '@/components/results/CategoriesAccordion'
import Trans from '@/components/translation/trans/TransServer'
import { eauMetric } from '@/constants/model/metric'
import { getRules } from '@/helpers/modelFetching/getRules'
import type { Locale } from '@/i18nConfig'
import type { ComputedResults } from '@/publicodes-state/types'

interface Props {
  locale: Locale
  computedResults: ComputedResults
}

export default async function WaterFootprintDetail({
  locale,
  computedResults,
}: Props) {
  const rules = await getRules({ locale })
  return (
    <section className="mb-12">
      <h2 className="mb-6 text-2xl font-normal">
        <Trans locale={locale} key="eau.resultats.waterFootprintDetail.title">
          D’où vient votre résultat ?
        </Trans>
      </h2>

      <div className="flex gap-12">
        <div className="flex-1">
          <CategoriesAccordion
            locale={locale}
            rules={rules}
            computedResults={computedResults}
            metric={eauMetric}
          />
        </div>

        <div className="max-w-96">
          <img
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/empreinte_carbone_achats_be9fd99289.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
