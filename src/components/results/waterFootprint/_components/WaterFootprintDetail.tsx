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
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="md:w-xl">
          <h2 className="title-md mb-6">
            <Trans
              locale={locale}
              key="eau.resultats.waterFootprintDetail.title">
              D’où vient votre résultat ?
            </Trans>
          </h2>

          <CategoriesAccordion
            locale={locale}
            rules={rules}
            computedResults={computedResults}
            metric={eauMetric}
          />
        </div>

        <div className="w-auto">
          <img
            className="mx-auto w-72 md:w-xs"
            src="https://nosgestesclimat-prod.s3.fr-par.scw.cloud/cms/empreinte_carbone_achats_be9fd99289.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  )
}
