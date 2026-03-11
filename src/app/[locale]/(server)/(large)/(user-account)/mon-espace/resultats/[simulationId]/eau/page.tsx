import FootprintsLinks from '@/components/results/FootprintsLinks'
import WaterFootprintResults from '@/components/results/waterFootprint/WaterFootprintResults'
import { MON_ESPACE_RESULTS_PATH } from '@/constants/urls/paths'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getUser } from '@/helpers/server/dal/user'
import { throwNextError } from '@/helpers/server/error'
import { getSimulationResult } from '@/helpers/server/model/simulationResult'
import type { DefaultPageProps } from '@/types'

export default async function DetailledResultsWaterPage({
  params,
}: DefaultPageProps<{ params: { locale: string; simulationId: string } }>) {
  const { simulationId, locale } = await params

  const { t } = await getServerTranslation({ locale })

  const user = await getUser()

  const simulationResult = await throwNextError(() =>
    getSimulationResult({
      simulationId,
      user,
    })
  )

  return (
    <>
      <Breadcrumbs
        items={[
          {
            href: MON_ESPACE_RESULTS_PATH,
            label: t(
              'mon-espace.resultsDetail.breadcrumb.results',
              'Mes résultats'
            ),
          },
          {
            href: `/mon-espace/resultats/${simulationId}`,
            label: t(
              'mon-espace.resultsDetail.breadcrumb.resultDetail',
              'Détail des résultats'
            ),
          },
          {
            href: `/mon-espace/resultats/${simulationId}/eau`,
            label: t(
              'mon-espace.resultsDetail.breadcrumb.waterFootprint',
              'Empreinte eau'
            ),
            isActive: true,
          },
        ]}
      />

      <FootprintsLinks
        locale={locale}
        simulationId={simulationId}
        currentPage="eau"
        basePathname={`${MON_ESPACE_RESULTS_PATH}/resultats/${simulationId}`}
      />

      <WaterFootprintResults
        simulationResult={simulationResult}
        locale={locale}
        hideSaveBlock
      />
    </>
  )
}
