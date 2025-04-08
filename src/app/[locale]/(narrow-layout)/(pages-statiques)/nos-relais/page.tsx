import type { PartnerType } from '@/adapters/cmsClient'
import Trans from '@/components/translation/trans/TransServer'
import InlineLink from '@/design-system/inputs/InlineLink'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { t } from '@/helpers/metadata/fakeMetadataT'
import { getCommonMetadata } from '@/helpers/metadata/getCommonMetadata'
import { fetchPartners } from '@/services/cms/fetchPartners'
import type { DefaultPageProps } from '@/types'
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
      const accUpdated = { ...acc }
      if (!Object.keys(acc).includes(partner.category.category)) {
        accUpdated[partner.category.category] = []
      }

      accUpdated[partner.category.category].push(partner)

      return accUpdated
    },
    {} as { [key: string]: PartnerType[] }
  )
}

export default async function NosRelais({ params }: DefaultPageProps) {
  const { locale } = await params
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

      <div className="flex flex-wrap items-center md:flex-nowrap md:gap-16">
        <div>
          <p>
            <Trans locale={locale}>
              Plus de 40 acteurs relaient ou ont relayé Nos Gestes Climat à
              travers 
              <a
                href="https://accelerateur-transition-ecologique-ademe.notion.site/Int-grer-Nos-Gestes-Climat-en-iframe-abdeb175baf84143922006964d80348c"
                target="_blank"
                rel="noopener noreferrer">
                l’intégration du calculateur
              </a>{' '}
              sur leur site internet ou sa diffusion via{' '}
              <InlineLink href="/organisations">des campagnes</InlineLink>{' '}
              (mail, réseaux sociaux et / ou affichage). C’est majoritairement
              grâce à eux que nous sensibilisons près de 2 000 nouvelles
              personnes en moyenne chaque jour et nous les en remercions.
            </Trans>
          </p>

          <p>
            <Trans locale={locale}>
              Vous avez relayé Nos Gestes Climat et souhaitez apparaître dans
              notre galerie de relais ? Merci de nous envoyer un message avec
              votre logo via{' '}
              <InlineLink href="/contact">notre page de contact</InlineLink>.
            </Trans>
          </p>

          <p className="mb-8 italic">
            <Trans locale={locale}>
              N.B. : aucun acteur cité ci-dessous ne finance Nos Gestes Climat,
              qui est et restera un service public, indépendant et gratuit de
              l’ADEME.
            </Trans>
          </p>
        </div>
        <Image
          width="300"
          height="400"
          className="ml-auto w-48 self-start md:-mt-16 md:w-auto"
          alt={t(
            'Un grand-père et sa petite-fille au cinéma, mangeant du pop-corn.'
          )}
          src="/images/ambassadeurs/illu-cinema.svg"
        />
      </div>

      {Object.entries(partnersByCategories).map(
        ([category, partners]: [string, PartnerType[]]) => (
          <div key={category} className="mb-16">
            <h2>{category}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {partners.map((partner) => (
                <Card
                  key={partner.name}
                  href={partner.link}
                  tag="a"
                  className="bg-primary-50 border-none no-underline"
                  target="_blank">
                  <Image
                    src={partner.imageSrc}
                    width="100"
                    height="100"
                    className="mx-auto mb-4 h-36 w-2/3 object-contain"
                    alt={partner.name}
                  />
                  <p className="mb-4 font-bold">{partner.name}</p>
                  <p className="my-0 underline">
                    {
                      partner.link
                        .replace('https://', '')
                        .replace('www.', '')
                        .split('/')[0]
                    }
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}
