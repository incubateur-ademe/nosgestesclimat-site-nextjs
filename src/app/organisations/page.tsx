import Trans from '@/components/translation/Trans'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Main from '@/design-system/layout/Main'
import Separator from '@/design-system/layout/Separator'
import { headers } from 'next/headers'
import Image from 'next/image'
import CTAFooter from './_components/CTAFooter'
import HeroSection from './_components/HeroSection'
import IllustratedPoint from './_components/IllustratedPoint'
import PartnersSection from './_components/PartnersSection'
import VisuelIframe from './_components/VisuelIframe'

const illustratedPointsItems = [
  {
    title: <Trans>Sensibilisez votre organisation</Trans>,
    subTitle: (
      <Trans>Partagez une version personnalisée de Nos Gestes Climat</Trans>
    ),
    body: (
      <Trans>
        Créez une campagne Nos Gestes Climat personnalisée au sein de votre
        organisation et accédez à des services sur mesure pour sensibiliser vos
        partenaires au sein de votre organisation.
      </Trans>
    ),
    image: (
      <div className="mx-auto mt-4 flex items-end rounded-t-md bg-white p-4 pb-0 shadow-sm">
        <Image
          src="/images/organisations/orga-visuel-1.png"
          width="300"
          height="200"
          alt=""
        />
      </div>
    ),
  },
  {
    title: <Trans>Statistiques et exports</Trans>,
    subTitle: <Trans>Explorez, comparez et analysez vos données</Trans>,
    body: (
      <Trans>
        Explorez, analysez et téléchargez des données pour faire des choix
        éclairés et pour améliorer continuellement votre démarche écologique.
        Avec nos exports sur mesure, partagez vos réussites et vos challenges
        avec vos équipes et parties prenantes pour une stratégie de durabilité
        unifiée.
      </Trans>
    ),
    image: (
      <div className="w-full">
        <Image
          src="/images/organisations/orga-visuel-2.png"
          width="360"
          height="500"
          alt=""
        />
      </div>
    ),
  },
  {
    title: <Trans>Lien personnalisé & iframes</Trans>,
    subTitle: <Trans>Intégrez Nos Gestes Climat à vos services</Trans>,
    body: (
      <Trans>
        Permettez à vos collaborateurs, employés, partenaires ou élèves de
        calculer et réduire leur empreinte carbone directement depuis vos
        plateformes web et mobile, avec un lien dédié ou d’autres modes
        d’intégration prêts à l’emploi.
      </Trans>
    ),
    image: <VisuelIframe />,
  },
]

export default function Page() {
  const headersList = headers()

  const pathname = headersList.get('next-url')

  return (
    <Main>
      <Breadcrumbs
        items={[
          {
            href: '/',
            label: 'Accueil',
            isActive: pathname === '/',
          },
          {
            href: '/organisations',
            label: 'Organisations',
            isActive: pathname === '/organisations',
          },
        ]}
      />

      <section className="w-full bg-[#fff] ">
        <div className="mx-auto max-w-5xl px-6 lg:px-0">
          <HeroSection />

          <Separator className="my-12" />

          <ul className="flex flex-col gap-28">
            {illustratedPointsItems.map(
              ({ title, subTitle, image, body }, index) => (
                <li key={`illustrated-point-${index}`}>
                  <IllustratedPoint
                    title={title}
                    subTitle={subTitle}
                    body={body}
                    image={image}
                  />
                </li>
              )
            )}
          </ul>

          <PartnersSection />
        </div>

        <CTAFooter />
      </section>
    </Main>
  )
}
