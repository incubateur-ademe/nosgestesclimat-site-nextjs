import SimulationResults from '@/components/results/SimulationResults'
import { AUTHENTICATION_COOKIE_NAME } from '@/constants/authentication/cookie'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getUser } from '@/helpers/server/dal/user'
import { getSimulationResult } from '@/helpers/server/model/simulationResult'
import type { Locale } from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import { cookies } from 'next/headers'
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

    const ngcCookie =
      (await cookies()).get(AUTHENTICATION_COOKIE_NAME)?.value ?? ''

    simulationResult = await getSimulationResult({
      user,
      simulationId,
      ngcCookie,
    })
  } catch {
    notFound()
  }

  return (
    <SimulationResults
      simulationResult={simulationResult}
      simulationId={simulationId}
      locale={locale as Locale}
    />
  )
}
