import UnderstandToAct from '@/components/landing-pages/UnderstandToAct'
import Trans from '@/components/translation/Trans'
import { getServerTranslation } from '@/helpers/getServerTranslation'

export default async function UnderstandToActCarbonFootprint() {
  const { t } = await getServerTranslation()

  return (
    <UnderstandToAct
      description={
        <p className="mb-0">
          <Trans>
            Réduire efficacement son empreinte sur l’environnement nécessite de{' '}
            <strong className="text-primary-600">
              s’informer sur les enjeux du réchauffement climatique
            </strong>
            , s'inspirer des bonnes pratiques et{' '}
            <strong className="text-primary-600">passer à l’action</strong>.
          </Trans>
        </p>
      }
      posts={[
        {
          category: t('Empreinte carbone'),
          title: t('Transports : les modes à fuir, ceux à chérir'),
          href: '/blog/transports-fuir-transports-cherir',
          imageSrc: '/images/blog/van-bus-velo-elviss-railijs-bitans.jpg',
        },
        {
          category: t('Empreinte carbone'),
          title: t("L'empreinte carbone : une empreinte parmi d'autres !"),
          href: '/blog/carbone-empreinte-parmi-autres',
          imageSrc: '/images/blog/markus-spiske-nature-future.jpg',
        },
        {
          category: t('Empreinte carbone'),
          title: t('Avez-vous déjà entendu parler de maladaptation ?'),
          href: '/blog/maladaptation',
          imageSrc: '/images/blog/william-bossen-fonte-glaces.jpg',
        },
      ]}
    />
  )
}
