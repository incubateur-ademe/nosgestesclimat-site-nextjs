import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import TransServer from '@/components/translation/trans/TransServer'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function UnderstandToActCarbonFootprint({
  pathname,
  locale,
}: {
  pathname: string
  locale: string
}) {
  const { t } = await getServerTranslation(locale)

  return (
    <UnderstandToAct
      locale={locale}
      pathname={pathname}
      description={
        <p className="mb-0">
          <TransServer locale={locale}>
            Réduire efficacement son empreinte sur l’environnement nécessite de{' '}
            <strong className="text-primary-600">
              s’informer sur les enjeux du réchauffement climatique
            </strong>
            , s'inspirer des bonnes pratiques et{' '}
            <strong className="text-primary-600">passer à l’action</strong>.
          </TransServer>
        </p>
      }
      posts={[
        {
          category: t('Empreinte carbone'),
          title: t('Transports : les modes à fuir, ceux à chérir'),
          href: '/blog/mobilites/transports-fuir-transports-cherir',
          imageSrc: '/images/blog/seo/empreinte-carbone-transports.jpg',
          imageAlt: t(
            "Deux mini-vans, illustrant l'empreinte carbone des transports"
          ),
        },
        {
          category: t('Empreinte carbone'),
          title: t("L'empreinte carbone : une empreinte parmi d'autres !"),
          href: '/blog/environnement/carbone-empreinte-parmi-autres',
          imageSrc: '/images/blog/seo/agir-reduire-empreinte-carbone.jpg',
          imageAlt: t(
            'Une manifestation pour le climat, illustrant les actions pour réduire son empreinte carbone'
          ),
        },
        {
          category: t('Empreinte carbone'),
          title: t('Avez-vous déjà entendu parler de maladaptation ?'),
          href: '/blog/environnement/maladaptation',
          imageSrc: '/images/blog/seo/changement-climatique-maladaptation.jpg',
          imageAlt: t(
            'Une banquise clairesemée sous le soleil, illustrant la maladaptation au changement climatique'
          ),
        },
      ]}
    />
  )
}
