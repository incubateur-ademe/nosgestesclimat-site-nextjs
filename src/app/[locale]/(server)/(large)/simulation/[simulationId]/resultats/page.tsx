import SimulationResults from '@/components/results/carbonFootprint/SimulationResults'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getUser } from '@/helpers/server/dal/user'
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
  searchParams,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats'>) {
  const { simulationId, locale } = await params
  const { userId: searchParamsUserId } = await searchParams

  // Try cookie-based user first, fallback to userId from query params
  // (passed by SimulationResolverFallback when cookie isn't set yet)
  const user = await getUser()
  const userId =
    user?.id ??
    (typeof searchParamsUserId === 'string' ? searchParamsUserId : undefined)

  if (!userId) {
    notFound()
  }

  return (
    <SimulationResults
      simulationId={simulationId}
      locale={locale as Locale}
      userId={userId}
    />
  )
}
