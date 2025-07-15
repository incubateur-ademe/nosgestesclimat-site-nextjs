import MDXContent from '@/components/mdx/MDXContent'
import Trans from '@/components/translation/trans/TransServer'
import { NOT_FOUND_PATH } from '@/constants/urls/paths'
import ButtonLink from '@/design-system/buttons/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import guideAlimentation from '@/locales/guide-mode-groupe/fr/guide-alimentation.mdx'
import guideDivers from '@/locales/guide-mode-groupe/fr/guide-divers.mdx'
import guideLogement from '@/locales/guide-mode-groupe/fr/guide-logement.mdx'
import guideNumerique from '@/locales/guide-mode-groupe/fr/guide-numerique.mdx'
import guideServicesSocietaux from '@/locales/guide-mode-groupe/fr/guide-services-societaux.mdx'
import guideTransport from '@/locales/guide-mode-groupe/fr/guide-transport.mdx'
import type { DefaultPageProps } from '@/types'
import { redirect } from 'next/navigation'

const categories: Record<string, any> = {
  alimentation: guideAlimentation,
  divers: guideDivers,
  logement: guideLogement,
  numerique: guideNumerique,
  'services-societaux': guideServicesSocietaux,
  transport: guideTransport,
}

export async function generateMetadata({
  params,
}: DefaultPageProps<{ params: { category: string } }>) {
  const { category, locale } = await params
  const { t } = await getServerTranslation({ locale })

  return getMetadataObject({
    locale,
    title: t('Le guide - Nos Gestes Climat'),
    description: t(
      'Retrouvez dans ce guide toutes les informations sur Nos Gestes Climat.'
    ),
    alternates: {
      canonical: `/guide/${category}`,
    },
  })
}

export default async function CategoryGuidePage({
  params,
}: DefaultPageProps<{ params: { category: string } }>) {
  const { category, locale } = await params

  if (!categories[category]) {
    return redirect(NOT_FOUND_PATH)
  }

  return (
    <div className="mx-auto my-4 flex flex-col items-start justify-center">
      <ButtonLink color="text" href="/guide">
        <span className="mr-2 inline-block">◀</span>
        <Trans locale={locale}>Retour</Trans>
      </ButtonLink>
      <MDXContent locale={locale} contentFr={categories[category]} />
    </div>
  )
}
