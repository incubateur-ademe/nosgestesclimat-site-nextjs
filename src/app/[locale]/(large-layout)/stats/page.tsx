import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'
import StatsContent from './_components/StatsContent'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation(params)

  return getMetadataObject({
    locale,
    title: t("Nos Statistiques d'utilisation - Nos Gestes Climat"),
    description: t(
      "Observez l'évolution de l'impact de Nos Gestes Climat en mesures chiffrées."
    ),
    alternates: {
      canonical: '/stats',
    },
  })
}

export default function Dashboard() {
  return <StatsContent />
}
