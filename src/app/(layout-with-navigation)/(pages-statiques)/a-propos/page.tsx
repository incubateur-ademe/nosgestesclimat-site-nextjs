import PasserTestBanner from '@/components/layout/PasserTestBanner'
import MDXContent from '@/components/mdx/MDXContent'
import Trans from '@/components/translation/Trans'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import AboutEn from '@/locales/pages/en/about.mdx'
import AboutEs from '@/locales/pages/es/about.mdx'
import AboutFr from '@/locales/pages/fr/about.mdx'
import Image from 'next/image'

export async function generateMetadata() {
  const { t } = await getServerTranslation()

  return getMetadataObject({
    title: t('À propos - Nos Gestes Climat'),
    description: t('Informations relatives à Nos Gestes Climat.'),
    alternates: {
      canonical: '/a-propos',
    },
  })
}

export default async function AProposPage() {
  const { t } = await getServerTranslation()

  return (
    <>
      <PasserTestBanner />

      <div className="flex flex-wrap gap-8 pb-8 md:flex-nowrap">
        <div>
          <Title title={t('À propos 🦔')} />

          <h2>
            <Trans>Qu'est-ce que c'est ?</Trans>
          </h2>

          <p>
            <Trans>
              Ce simulateur vous permet d'évaluer votre empreinte carbone
              individuelle annuelle totale et par grandes catégories
              (alimentation, transport, logement, divers, services sociétaux),
              de la situer par rapport aux objectifs climatiques et surtout de
              passer à l'action à votre niveau avec des gestes personnalisés en
              fonction de vos réponses.
            </Trans>
          </p>
        </div>

        <Image
          className="self-start"
          src="/images/illustrations/girl-holding-earth.svg"
          width="260"
          height="400"
          alt={t(
            'Une jeune fille tenant la terre sous le regard enjoué de son chien.'
          )}
        />
      </div>

      <MDXContent contentEn={AboutEn} contentFr={AboutFr} contentEs={AboutEs} />
    </>
  )
}
