import SimulateurSkeleton from '@/app/[locale]/(simulation)/simulateur/[root]/skeleton'
import { noIndexObject } from '@/constants/metadata'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getInitialUserId, getUser } from '@/helpers/server/dal/user'
import { getUserSimulations } from '@/helpers/server/model/simulations'
import { UserProvider } from '@/publicodes-state'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'
import SimulationResolverFallback from './_components/SimulationResolverFallback'

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

export default async function SimulationResultatsResolverPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const user = await getUser()

  if (user?.isAuth) {
    // If authenticated, get their simulations
    const simulations = await getUserSimulations({ userId: user.id })

    if (simulations && simulations.length > 0) {
      // Redirect to the most recent one (getUserSimulations already returns them sorted by date)
      redirect(`/${locale}/simulation/${simulations[0].id}/resultats`)
    }
  }

  const initialUserId = await getInitialUserId()

  // If not authenticated or no simulations on server, fallback to client-side (localStorage)
  return (
    <>
      {/* We show a skeleton while the client-side redirection is happening to avoid a flash of white */}
      <SimulateurSkeleton />

      <UserProvider initialUserId={initialUserId}>
        <SimulationResolverFallback locale={locale} />
      </UserProvider>
    </>
  )
}
