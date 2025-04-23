import type { PartnerType } from '@/adapters/cmsClient'
import CategoryFilters from '@/components/filtering/CategoryFilters'
import Trans from '@/components/translation/trans/TransServer'
import { FILTER_SEARCH_PARAM_KEY } from '@/constants/filtering'
import InlineLink from '@/design-system/inputs/InlineLink'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import Emoji from '@/design-system/utils/Emoji'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { fetchPartners } from '@/services/cms/fetchPartners'
import type { DefaultPageProps } from '@/types'
import { encodeDottedNameAsURI } from '@/utils/format/encodeDottedNameAsURI'
import type { DottedName } from '@incubateur-ademe/nosgestesclimat'
import Image from 'next/image'

export const generateMetadata = getCommonMetadata({
  title: t('Nos relais - Nos Gestes Climat'),
  description: t(
    'Découvrez les relais de Nos Gestes Climat : organisations, collectivités, médias, influenceurs, etc.'
  ),
  alternates: {
    canonical: '/nos-relais',
  },
})

const getPartnersByCategory = (partners: PartnerType[]) => {
  return partners.reduce(
    (acc, partner) => {
      if (!Object.keys(acc).includes(partner.category.category)) {
        acc[partner.category.category] = []
      }

      acc[partner.category.category].push(partner)

      return acc
    },
    {} as { [key: string]: PartnerType[] }
  )
}

export default async function OurPartners({
  params,
  searchParams,
}: DefaultPageProps & {
  searchParams: Promise<{ [FILTER_SEARCH_PARAM_KEY]: string }>
}) {
  const { locale } = await params
  const { [FILTER_SEARCH_PARAM_KEY]: categoryFilter } = await searchParams

  const { t } = await getServerTranslation({ locale })

  const partners = await fetchPartners()

  const partnersByCategories = getPartnersByCategory(partners)

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
            <Emoji>ℹ️</Emoji> <Trans locale={locale}>N.B.</Trans>{' '}
            <Trans locale={locale}>
              : aucun acteur cité ci-dessous ne finance Nos Gestes Climat, qui
              est et restera un service public, indépendant et gratuit de
              l'ADEME.
            </Trans>
          </p>
        </div>

        <Image
          width="200"
          height="400"
          className="ml-auto w-64 self-start md:-mt-16"
          alt={t(
            'Un grand-père et sa petite-fille au cinéma, mangeant du pop-corn.'
          )}
          src="/images/illustrations/at-the-cinema.svg"
        />
      </div>

      <CategoryFilters
        categories={Object.keys(partnersByCategories).map(
          (category: string) => ({
            title: category,
            dottedName: category as DottedName,
            count: partnersByCategories[category].length,
          })
        )}
        className="mb-6"
      />
      {Object.keys(partnersByCategories)
        .filter((category: string) =>
          typeof categoryFilter !== 'undefined'
            ? categoryFilter === encodeDottedNameAsURI(category)
            : true
        )
        .map((category: string) => (
          <div key={category} className="mb-16">
            <h2>{category}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {partnersByCategories[category].map((partner) => (
                <Card
                  key={partner.name}
                  href={partner.link}
                  tag="a"
                  className="bg-primary-50 flex flex-col justify-between border-none no-underline"
                  target="_blank">
                  <Image
                    src={partner.imageSrc}
                    width="100"
                    height="100"
                    className="mx-auto mb-4 h-36 w-2/3 object-contain"
                    alt={partner.name}
                  />
                  <section>
                    <p className="mb-1 font-bold">{partner.name}</p>
                    <p className="my-0 text-sm underline">
                      {' '}
                      {
                        partner.link
                          .replace('https://', '')
                          .replace('www.', '')
                          .split('/')[0]
                      }
                    </p>
                  </section>
                </Card>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
