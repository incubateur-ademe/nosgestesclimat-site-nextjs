import Trans from '@/components/translation/Trans'
import { homeClickClassements } from '@/constants/tracking/pages/home'
import ButtonLink from '@/design-system/inputs/ButtonLink'
import { getServerTranslation } from '@/helpers/getServerTranslation'
import Image from 'next/image'

export default async function Amis() {
  const { t } = await getServerTranslation()
  return (
    <div className="mx-auto flex max-w-5xl flex-row-reverse items-center justify-between gap-24">
      <Image
        src="/images/misc/home-group.svg"
        alt={t('Des amis jouant à un jeu de société')}
        width="444"
        height="275"
        className="mb-6 block h-auto max-w-full"
        loading="lazy"
      />
      <div className="flex-1">
        <h3 className="text-2xl">
          <Trans>Challengez votre entourage</Trans>
        </h3>
        <p className="text-lg">
          <Trans>
            Créez un groupe avec vos proches et{' '}
            <strong className="text-primary-700">
              lancez-vous dans un défi collectif
            </strong>{' '}
            pour réduire votre empreinte. Comparez vos résultats, suivez vos
            progrès et voyez qui parvient à réduire le plus ses émissions de
            carbone ou sa consommation d’eau.
          </Trans>
        </p>
        <ButtonLink
          href="/classements"
          data-cypress-id="classements-link"
          trackingEvent={homeClickClassements}>
          <Trans>Créer un groupe</Trans>
        </ButtonLink>
      </div>
    </div>
  )
}
