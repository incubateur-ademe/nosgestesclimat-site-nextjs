import SimulationResults from '@/components/results/SimulationResults'
import { USER_ID_COOKIE_NAME } from '@/constants/authentication/cookie'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getUser } from '@/helpers/server/model/user'
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
  searchParams,
}: PageProps<'/[locale]/simulation/[simulationId]/resultats'>) {
  const { simulationId, locale } = await params
  const { userId: userIdParam } = await searchParams

  let user

  try {
    // Always returns a user or throws an error
    user = await getUser()
  } catch {
    user = null
  }

  // If not authenticated, we try to get the userId from the cookie or searchParams
  const userId =
    user?.id ??
    (await cookies()).get(USER_ID_COOKIE_NAME)?.value ??
    (userIdParam as string)

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
