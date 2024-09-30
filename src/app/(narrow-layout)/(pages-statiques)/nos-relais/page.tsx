import Trans from '@/components/translation/Trans'
import InlineLink from '@/design-system/inputs/InlineLink'
import Card from '@/design-system/layout/Card'
import Title from '@/design-system/layout/Title'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import { getMetadataObject } from '@/helpers/metadata/getMetadataObject'
import ambassadeursYaml from '@/locales/ambassadeurs/fr/ambassadeurs.yaml'
import Image from 'next/image'

export async function generateMetadata() {
  const { t } = await getServerTranslation()
  return getMetadataObject({
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

export default async function NosRelais() {
  const { t } = await getServerTranslation()

  return (
    <div>
      <Title>
        <Trans>Ils relaient </Trans>
        <span className="text-primary-700">
          <Trans>Nos Gestes Climat</Trans>
        </span>
      </Title>

      <div className="flex flex-wrap items-center md:flex-nowrap md:gap-16">
        <div>
          <p>
            <Trans>
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
            <Trans>
              Vous avez relayé Nos Gestes Climat et souhaitez apparaître dans
              notre galerie de relais ? Merci de nous envoyer un message avec
              votre logo via{' '}
              <InlineLink href="/contact">notre page de contact</InlineLink>.
            </Trans>
          </p>

          <p className="mb-8 italic">
            <Trans>
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

      {categories.map((category: any) => (
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
