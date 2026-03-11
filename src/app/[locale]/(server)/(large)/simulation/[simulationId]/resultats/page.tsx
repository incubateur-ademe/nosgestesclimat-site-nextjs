import QueryClientProviderWrapper from '@/app/[locale]/_components/mainLayoutProviders/QueryClientProviderWrapper'
import CarbonFootprintResults from '@/components/results/carbonFootprint/CarbonFootprintResults'
import FootprintsLinks from '@/components/results/FootprintsLinks'
import { noIndexObject } from '@/constants/metadata'
import { END_PAGE_PATH } from '@/constants/urls/paths'
import { PartnerProvider } from '@/contexts/partner/PartnerContext'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import { getUser } from '@/helpers/server/dal/user'
import { throwNextError } from '@/helpers/server/error'
import { getSimulationResult } from '@/helpers/server/model/simulationResult'
import type { Locale } from '@/i18nConfig'
import type { DefaultPageProps } from '@/types'
import PartnerRedirectionAlert from './_components/PartnerRedirectionAlert'

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
}: PageProps<'/[locale]/simulation/[simulationId]/resultats'>) {
  const { simulationId, locale } = await params

  const simulationResult = await throwNextError(async () => {
    const user = await getUser()
    return getSimulationResult({
      user,
      simulationId,
    })
  })

  return (
    <>
      <FootprintsLinks
        locale={locale as Locale}
        simulationId={simulationId}
        currentPage="carbone"
        basePathname={`${END_PAGE_PATH.replace(':id', simulationId)}`}
      />

      {/* Displays specific banner for partners */}
      <QueryClientProviderWrapper>
        <PartnerProvider>
          <PartnerRedirectionAlert />
        </PartnerProvider>
      </QueryClientProviderWrapper>

      <CarbonFootprintResults
        simulationResult={simulationResult}
        locale={locale as Locale}
      />
    </>
  )
}
