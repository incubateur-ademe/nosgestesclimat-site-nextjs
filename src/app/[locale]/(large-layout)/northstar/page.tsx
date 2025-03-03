import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import type { DefaultPageProps } from '@/types'
import NorthStarIframe from './_components/NorthStarIframe'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  return getMetadataObject({
    locale,
    title: t('Nos statistiques "phares" - Nos Gestes Climat'),
    description: t(
      "Observez nos l'évolution de nos deux mesures d'impact principales."
    ),
    alternates: {
      canonical: '/northstar',
    },
  })
}

export default async function NorthStarPage({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation(locale)

  const title = t('Statistiques Northstar')

  return (
    <div>
      <Title title={title} />

      <p>
        {t(
          'Le chargement prend parfois plusieurs minutes, visualiser ce dashboard demande un peu de patience ! 🕙'
        )}
      </p>

      <NorthStarIframe />
    </div>
  )
}
