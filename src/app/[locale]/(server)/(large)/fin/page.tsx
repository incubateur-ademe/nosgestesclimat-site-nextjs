import CarbonFootprintResults from '@/components/results/carbonFootprint/CarbonFootprintResults'
import FootprintsLinks from '@/components/results/FootprintsLinks'
import { noIndexObject } from '@/constants/metadata'
import { END_PAGE_PATH } from '@/constants/urls/paths'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getUser } from '@/helpers/server/dal/user'
import { throwNextError } from '@/helpers/server/error'
import { getSimulationResult } from '@/helpers/server/model/simulationResult'
import { getSimulations } from '@/helpers/server/model/simulations'
import { getTendency, Tendency } from '@/helpers/server/model/utils/getTendency'
import type { Locale } from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t(
      'endpage.meta.title.carbon',
      'Mon empreinte carbone - Nos Gestes Climat'
    ),
    description: t(
      "Vos résultats de tests de notre calculateur d'empreinte carbone."
    ),
    robots: noIndexObject,
  })
}

export default async function SimulationPage({
  params,
}: PageProps<'/[locale]/fin'>) {
  const { locale } = await params
  const user = await getUser()

  const [simulation, previousSimulation] = await getSimulations(
    { user },
    { onlyCompleted: true, pageSize: 2 }
  )
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!simulation) {
    notFound()
  }
  const simulationResult = await throwNextError(async () => {
    return getSimulationResult({
      user,
      simulation,
    })
  })
  let tendency: Tendency | undefined
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (previousSimulation) {
    tendency = getTendency({
      previousValue: previousSimulation.computedResults.carbone.bilan,
      currentValue: simulation.computedResults.carbone.bilan,
    })
  }

  return (
    <>
      <FootprintsLinks
        locale={locale as Locale}
        currentPage="carbone"
        basePathname={END_PAGE_PATH}
      />

      <CarbonFootprintResults
        simulationResult={simulationResult}
        locale={locale as Locale}
        tendency={tendency}
      />
    </>
  )
}
