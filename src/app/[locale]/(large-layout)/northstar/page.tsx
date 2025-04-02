import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import type { DefaultPageProps } from '@/types'
import NorthStarIframe from './_components/NorthStarIframe'

export const generateMetadata = getCommonMetadata({
  title: t('Nos statistiques "phares" - Nos Gestes Climat'),
  description: t(
    "Observez nos l'évolution de nos deux mesures d'impact principales."
  ),
  alternates: {
    canonical: '/northstar',
  },
})

export default async function NorthStarPage({ params }: DefaultPageProps) {
  const { t } = await getServerTranslation(params)

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
