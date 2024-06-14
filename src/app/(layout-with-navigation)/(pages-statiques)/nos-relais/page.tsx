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
      canonical: '/relais',
    },
  })
}

const ambassadeurs = ambassadeursYaml as any
const categories = Object.keys(ambassadeurs)

export default function page() {
  return (
    <div>
      <Title>
        <Trans>
          Ils relaient{' '}
          <span className="text-primary-700">Nos Gestes Climat</span>
        </Trans>
      </Title>

      <p>
        Plus de 40 acteurs relaient{' '}
        <span className="text-secondary-700">ou</span> ont relayé Nos Gestes
        Climat à travers 
        <a
          href="https://accelerateur-transition-ecologique-ademe.notion.site/Int-grer-Nos-Gestes-Climat-en-iframe-abdeb175baf84143922006964d80348c"
          target="_blank"
          rel="noopener noreferrer">
          l’intégration du calculateur
        </a>{' '}
        sur leur site internet <span className="text-secondary-700">ou</span> sa
        diffusion via{' '}
        <InlineLink href="/organisations">des campagnes</InlineLink> (mail,
        réseaux sociaux et/ou affichage). C’est majoritairement grâce à eux que
        nous sensibilisons près de 2 000 nouvelles personnes en moyenne chaque
        jour et nous les en remercions.
      </p>

      <p>
        Vous avez relayé Nos Gestes Climat et souhaitez apparaître dans notre
        galerie de relais ? Merci de nous envoyer un message avec{' '}
        <span className="text-secondary-700">votre logo</span> via{' '}
        <InlineLink href="/contact">notre page de contact</InlineLink>.
      </p>

      <p className="mb-8 italic">
        N.B. : aucun acteur cité ci-dessous ne finance Nos Gestes Climat, qui
        est et restera un service public, indépendant et gratuit de l’ADEME.
      </p>

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
