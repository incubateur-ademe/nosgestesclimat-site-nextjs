import Route404 from '@/components/layout/404'
import MDXContent from '@/components/mdx/MDXContent'
import Trans from '@/components/translation/Trans'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import guideAlimentation from '@/locales/guide-mode-groupe/fr/guide-alimentation.mdx'
import guideDivers from '@/locales/guide-mode-groupe/fr/guide-divers.mdx'
import guideLogement from '@/locales/guide-mode-groupe/fr/guide-logement.mdx'
import guideNumerique from '@/locales/guide-mode-groupe/fr/guide-numerique.mdx'
import guideServicesSocietaux from '@/locales/guide-mode-groupe/fr/guide-services-societaux.mdx'
import guideTransport from '@/locales/guide-mode-groupe/fr/guide-transport.mdx'

const categories: Record<string, any> = {
  alimentation: guideAlimentation,
  divers: guideDivers,
  logement: guideLogement,
  numerique: guideNumerique,
  'services-societaux': guideServicesSocietaux,
  transport: guideTransport,
}

export async function generateMetadata({
  params: { category },
}: {
  params: { category: string }
}) {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('Le guide - Nos Gestes Climat'),
    description: t(
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.'
    ),
    alternates: {
      canonical: `/guide/${category}`,
    },
  })
}

export default function CategoryGuidePage({
  params: { category },
}: {
  params: { category: string }
}) {
  return (
    <div className="mx-auto my-4 flex flex-col items-start justify-center">
      <ButtonLink color="text" href="/guide">
        <span className="mr-2 inline-block">◀</span>
        <Trans>Retour</Trans>
      </ButtonLink>
      {categories[category] ? (
        <MDXContent contentFr={categories[category]} />
      ) : (
        <Route404 />
      )}
    </div>
  )
}
