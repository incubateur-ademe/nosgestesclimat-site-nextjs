import SimulationResults from '@/components/results/SimulationResults'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getUser } from '@/helpers/server/dal/user'
import { getSimulationResult } from '@/helpers/server/model/simulationResult'
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
    alternates: {
      canonical: '/simulation/resultats',
    },
  })
}

export default async function SimulationPage({
  params,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats'>) {
  const { simulationId, locale } = await params

  let simulationResult

  try {
    const user = await getUser()

    simulationResult = await getSimulationResult({
      user,
      simulationId,
    })
  } catch {
    notFound()
  }

  return (
    <SimulationResults
      simulationResult={simulationResult}
      locale={locale as Locale}
    />
  )
}
