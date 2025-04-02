import CategoryFilters from '@/components/filtering/CategoryFilters'
import Trans from '@/components/translation/trans/TransServer'
import { FILTER_SEARCH_PARAM_KEY } from '@/constants/filtering'
import InlineLink from '@/design-system/inputs/InlineLink'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ambassadeursYaml from '@/locales/ambassadeurs/fr/ambassadeurs.yaml'
import type { DefaultPageProps } from '@/types'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Image from 'next/image'

export async function generateMetadata({ params }: DefaultPageProps) {
  const { locale } = await params
  const { t } = await getServerTranslation({ locale })
  return getMetadataObject({
    locale,
    title: t('Nos relais - Nos Gestes Climat'),
    description: t(
      'Découvrez les relais de Nos Gestes Climat : organisations, collectivités, médias, influenceurs, etc.'
    ),
    alternates: {
      canonical: '/nos-relais',
    },
  })
}

const ambassadeurs = ambassadeursYaml as any
const categories = Object.keys(ambassadeurs)

export default async function NosRelais({
  params,
  searchParams,
}: DefaultPageProps & {
  searchParams: Promise<{ [FILTER_SEARCH_PARAM_KEY]: string }>
}) {
  const { locale } = await params
  const { [FILTER_SEARCH_PARAM_KEY]: categoryFilter } = await searchParams

  const { t } = await getServerTranslation({ locale })

  return (
    <div>
      <Title>
        <Trans locale={locale}>Ils relaient </Trans>
        <span className="text-primary-700">
          <Trans locale={locale}>Nos Gestes Climat</Trans>
        </span>
      </Title>

      <div className="mb-8 flex flex-col items-center md:flex-row md:flex-nowrap md:gap-16">
        <div className="flex-1">
          <p>
            <strong className="text-primary-700">
              <Trans locale={locale}>Plusieurs milliers d’organisations</Trans>
            </strong>{' '}
            <Trans locale={locale}>
              partagent Nos Gestes Climat via leur site ou des campagnes (mails,
              réseaux sociaux, affichage), nous permettant de sensibiliser près
              de 2 000 personnes chaque jour. Un grand merci à eux !
            </Trans>
          </p>

          <p>
            <Trans locale={locale}>
              Vous relayez Nos Gestes Climat et souhaitez apparaître dans notre
              galerie ?
            </Trans>{' '}
            <InlineLink className="inline" href="/contact">
              <Trans locale={locale}>
                Envoyez-nous votre logo via notre page de contact
              </Trans>
            </InlineLink>
          </p>

          <p className="mb-8 italic">
            <Emoji>ℹ️</Emoji>{' '}
            <Trans locale={locale}>
              Aucun de ces acteurs ne finance Nos Gestes Climat, un service
              public, gratuit et indépendant de l'ADEME.
            </Trans>
          </p>
        </div>
        <Image
          width="240"
          height="300"
          className="ml-auto max-w-56 self-start md:-mt-16 md:w-auto md:max-w-80"
          alt={t(
            'Un grand-père et sa petite-fille au cinéma, mangeant du pop-corn.'
          )}
          src="/images/ambassadeurs/illu-cinema.svg"
        />
      </div>

      <CategoryFilters
        categories={categories.map((category: string) => ({
          title: category,
          dottedName: category as DottedName,
          count: ambassadeurs[category].length,
        }))}
        className="mb-6"
      />

      {categories
        .filter((category: string) =>
          typeof categoryFilter !== 'undefined'
            ? categoryFilter === category
            : true
        )
        .map((category: any) => (
          <div key={category} className="mb-16">
            <h2>{category}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {ambassadeurs[category].map((ambassadeur: any) => (
                <Card
                  key={ambassadeur.title}
                  href={ambassadeur.link}
                  tag="a"
                  className="border-none bg-primary-50 no-underline"
                  target="_blank">
                  <Image
                    src={'/images/ambassadeurs/' + ambassadeur.image}
                    width="100"
                    height="100"
                    className="mx-auto mb-4 h-36 w-2/3 object-contain"
                    alt={ambassadeur.title}
                  />
                  <p className="mb-4 font-bold">{ambassadeur.title}</p>
                  {ambassadeur.link ? (
                    <p className="my-0 underline">
                      {
                        ambassadeur.link
                          .replace('https://', '')
                          .replace('www.', '')
                          .split('/')[0]
                      }
                    </p>
                  ) : null}
                </Card>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
