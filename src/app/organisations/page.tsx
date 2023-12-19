import Trans from '@/components/translation/Trans'
import Breadcrumbs from '@/design-system/layout/Breadcrumbs'
import Main from '@/design-system/layout/Main'
import Separator from '@/design-system/layout/Separator'
import { headers } from 'next/headers'
import HeroSection from './_components/HeroSection'
import IllustratedPoint from './_components/IllustratedPoint'

const illustratedPointsItems = [
  {
    title: <Trans>Sensibilisez votre organisation</Trans>,
    subTitle: (
      <Trans>Partagez une version personnalisée de Nos Gestes Climat</Trans>
    ),
    body: (
      <Trans>
        Créez une campagne Nos Gestes Climat personnalisée au sein de votre
        organisation et accédez à une multitude de services sur mesure pour
        aligner vos activités avec vos objectifs de durabilité.
      </Trans>
    ),
    imageSrc: '/images/illustrations/illustration-1.svg',
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
    imageSrc: '/images/illustrations/illustration-1.svg',
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
    imageSrc: '/images/illustrations/illustration-1.svg',
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
              ({ title, subTitle, imageSrc, body }, index) => (
                <li key={`illustrated-point-${index}`}>
                  <IllustratedPoint
                    title={title}
                    subTitle={subTitle}
                    body={body}
                    imageSrc={imageSrc}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    </Main>
  )
}
