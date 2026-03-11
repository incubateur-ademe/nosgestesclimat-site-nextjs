import WaterFootprintResults from '@/components/results/waterFootprint/WaterFootprintResults'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getUser } from '@/helpers/server/dal/user'
import { throwNextError } from '@/helpers/server/error'
import { getSimulationResult } from '@/helpers/server/model/simulationResult'
import { getSimulation } from '@/helpers/server/model/simulations'
import type { Locale } from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'

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
}: PageProps<'/[locale]/simulation/[simulationId]/resultats/eau'>) {
  const { simulationId, locale } = await params

  const simulationResult = await throwNextError(async () => {
    const user = await getUser()
    return getSimulationResult({
      user,
      simulation: await getSimulation({ user, simulationId }),
    })
  })

  return (
    <WaterFootprintResults
      simulationId={simulationId}
      simulationResult={simulationResult}
      locale={locale as Locale}
    />
  )
}
